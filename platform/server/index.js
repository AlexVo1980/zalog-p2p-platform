const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500 });
app.use('/api/', limiter);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zaloginvest')
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));

const Application = require('./models/Application');
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma2:9b';

// --- LIVE DEMO MODE: ГЕНЕРАЦИЯ ЗАЯВОК КАЖДЫЕ 90 СЕКУНД ---
function runAiSeeder() {
  console.log('✨ [LIVE DEMO] Запуск генерации новой заявки через ИИ...');
  const seeder = spawn('python3', [path.join(__dirname, '../ai_seed_deals.py')]);
  
  seeder.stdout.on('data', (data) => console.log(`[SEEDER]: ${data}`));
  seeder.stderr.on('data', (data) => console.error(`[SEEDER ERR]: ${data}`));
  
  seeder.on('close', (code) => {
    if (code === 0) {
      console.log('🚀 [LIVE DEMO] Новая заявка успешно добавлена в базу!');
      io.emit('new_deal', { timestamp: Date.now() }); // Оповещаем фронтенд через сокеты
    }
  });
}

// Запускаем цикл генерации (каждые 90 секунд)
setInterval(runAiSeeder, 90000); 

app.post('/api/ai/voice-command', async (req, res) => {
  const { text, history } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided' });

  try {
    const chatContext = (history || []).slice(-5).map(msg => 
      `${msg.role === 'user' ? 'Пользователь' : 'Ассистент'}: ${msg.text}`
    ).join('\n');

    const systemPrompt = `
      ТЫ — НЕЙРОННЫЙ ИНТЕЛЛЕКТ ЗАЛОГ ПРО.
      Отвечай ТОЛЬКО В JSON: {"action": "КОМАНДА", "speech": "Твой ответ"}
      ДЕЙСТВИЯ: OPEN_INVESTOR, OPEN_BORROWER, SCROLL_CALC, SCROLL_DEALS, SCROLL_LEGAL, SCROLL_RISKS, NONE.
    `;

    const response = await axios.post(OLLAMA_URL, {
      model: OLLAMA_MODEL,
      prompt: `${systemPrompt}\n\nЗАПРОС: "${text}"`,
      stream: false,
      format: 'json'
    }, { timeout: 90000 });

    res.json(JSON.parse(response.data.response.replace(/```json/g, '').replace(/```/g, '').trim()));
  } catch (error) {
    res.status(500).json({ action: 'NONE', speech: 'Я обрабатываю большой поток входящих заявок.' });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const apps = await Application.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) { res.status(500).json({ message: 'Error' }); }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`🚀 Backend active on port ${PORT}`);
  console.log(`📡 Live Demo Mode: Новые заявки будут подгружаться автоматически.`);
});

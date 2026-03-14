const express = require('express');
const router = express.Router();
const { sendPostNow, scheduleAutoPosts, stopAllScheduledPosts } = require('../services/postScheduler');
const { testConnection } = require('../services/telegramService');
const { generatePost } = require('../services/gptService');
const { auth } = require('../middleware/auth');

/**
 * POST /api/telegram-posts/send-now
 * Отправить пост прямо сейчас
 */
router.post('/send-now', auth, async (req, res) => {
  try {
    const { topic, style, channelId } = req.body;
    const post = await sendPostNow({ topic, style, channelId });
    res.json({ success: true, message: 'Пост отправлен', post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/telegram-posts/schedule
 * Настроить автоматическую отправку постов
 */
router.post('/schedule', auth, async (req, res) => {
  try {
    const { schedule, topic, style, channelId } = req.body;
    
    if (!schedule) {
      return res.status(400).json({ 
        success: false, 
        error: 'Не указано расписание (cron выражение)' 
      });
    }

    scheduleAutoPosts(schedule, { topic, style, channelId });
    res.json({ 
      success: true, 
      message: 'Автоматическая отправка настроена',
      schedule 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/telegram-posts/stop
 * Остановить автоматическую отправку
 */
router.post('/stop', auth, async (req, res) => {
  try {
    stopAllScheduledPosts();
    res.json({ success: true, message: 'Автоматическая отправка остановлена' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/telegram-posts/test
 * Проверить подключение к Telegram
 */
router.get('/test', auth, async (req, res) => {
  try {
    const { channelId } = req.query;
    const result = await testConnection(channelId);
    res.json({ success: result, message: result ? 'Подключение успешно' : 'Ошибка подключения' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/telegram-posts/generate
 * Сгенерировать пост без отправки (для предпросмотра)
 */
router.post('/generate', auth, async (req, res) => {
  try {
    const { topic, style } = req.body;
    const post = await generatePost(topic, style);
    res.json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;


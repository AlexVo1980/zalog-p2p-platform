const OpenAI = require('openai');
const axios = require('axios');

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma2:9b';

/**
 * Генерирует пост из шаблонов (fallback если GPT недоступен)
 */
function generatePostFromTemplate(topic = null) {
  const templates = [
    `🏠 <b>Займы под залог недвижимости</b>\n\nПолучите деньги под залог вашей недвижимости быстро и выгодно!\n\n✅ Без справок о доходах\n✅ Решение за 24 часа\n✅ Любая недвижимость\n\nСвяжитесь с нами для консультации! 📞`,
    `💰 <b>Инвестируйте с умом</b>\n\nСтаньте инвестором и получайте стабильный доход от займов под залог!\n\n📈 Высокая доходность\n🛡️ Надежное обеспечение\n📊 Прозрачные условия\n\nНачните инвестировать уже сегодня! 🚀`,
    `🔑 <b>Быстрые займы под залог</b>\n\nНужны деньги срочно? Мы поможем!\n\n⚡ Рассмотрение заявки за 1 день\n💵 Сумма до 70% от стоимости залога\n📋 Минимум документов\n\nОставьте заявку на нашем сайте! 👇`,
    `💼 <b>Займы для бизнеса</b>\n\nРазвивайте свой бизнес с нашими займами под залог!\n\n🏢 Коммерческая недвижимость\n🚗 Транспорт\n📦 Оборудование\n\nГибкие условия и индивидуальный подход! ✨`,
    `📊 <b>Статистика платформы</b>\n\nМы продолжаем расти вместе с вами!\n\n📈 Более 1000 успешных сделок\n⭐ Средняя сумма займа: 5 млн руб\n🎯 Уровень одобрения: 85%\n\nПрисоединяйтесь к нашему сообществу! 🎉`
  ];

  if (topic) {
    const topicLower = topic.toLowerCase();
    if (topicLower.includes('инвест') || topicLower.includes('доход')) return templates[1];
    if (topicLower.includes('бизнес') || topicLower.includes('коммер')) return templates[3];
    if (topicLower.includes('быстр') || topicLower.includes('срочн')) return templates[2];
  }

  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Генерирует пост для Telegram с помощью GPT или Ollama
 */
async function generatePost(topic = null, style = 'профессиональный') {
  const systemPrompt = `Ты - эксперт по созданию контента для Telegram канала о займах под залог имущества и инвестициях. 
Создавай интересные, информативные и привлекательные посты на русском языке.
Посты должны быть:
- Краткими (до 500 символов)
- С эмодзи для визуальной привлекательности
- С призывом к действию
- Профессиональными, но дружелюбными`;

  const userPrompt = topic 
    ? `Создай пост на тему: ${topic}. Стиль: ${style}`
    : `Создай интересный пост о займах под залог имущества или инвестициях. Стиль: ${style}`;

  // Использование Ollama
  if (AI_PROVIDER === 'ollama') {
    try {
      console.log(`🤖 Генерация поста через Ollama (${OLLAMA_MODEL})...`);
      const response = await axios.post(OLLAMA_URL, {
        model: OLLAMA_MODEL,
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        stream: false
      }, { timeout: 30000 });

      if (response.data && response.data.response) {
        return response.data.response.trim();
      }
    } catch (error) {
      console.error('⚠️ Ошибка при генерации поста через Ollama:', error.message);
    }
  }

  // Использование OpenAI (если настроен и выбран как провайдер)
  if (AI_PROVIDER === 'openai' && openai && process.env.OPENAI_API_KEY) {
    try {
      console.log('🤖 Генерация поста через OpenAI...');
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 300,
        temperature: 0.8,
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('⚠️ Ошибка при генерации поста через OpenAI:', error.message);
    }
  }

  // Fallback к шаблонам
  console.log('⚠️ Используются шаблоны для генерации поста');
  return generatePostFromTemplate(topic);
}

/**
 * Генерирует несколько вариантов постов
 */
async function generateMultiplePosts(count = 3, topic = null) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const post = await generatePost(topic);
    posts.push(post);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return posts;
}

module.exports = {
  generatePost,
  generateMultiplePosts,
};

const TelegramBot = require('node-telegram-bot-api');

// Инициализация бота
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: false, // Отключаем polling, используем только отправку сообщений
});

/**
 * Отправляет пост в Telegram канал
 * @param {string} message - Текст сообщения
 * @param {string} channelId - ID канала (например: '@your_channel' или '-1001234567890')
 * @param {object} options - Дополнительные опции (parse_mode, disable_web_page_preview и т.д.)
 * @returns {Promise<Message>}
 */
async function sendPostToChannel(message, channelId = null, options = {}) {
  try {
    const chatId = channelId || process.env.TELEGRAM_CHANNEL_ID;
    
    if (!chatId) {
      throw new Error('TELEGRAM_CHANNEL_ID не установлен в переменных окружения');
    }

    const defaultOptions = {
      parse_mode: 'HTML', // или 'Markdown'
      disable_web_page_preview: true,
      ...options,
    };

    const sentMessage = await bot.sendMessage(chatId, message, defaultOptions);
    console.log(`Пост успешно отправлен в канал ${chatId}`);
    return sentMessage;
  } catch (error) {
    console.error('Ошибка при отправке поста в Telegram:', error);
    throw error;
  }
}

/**
 * Отправляет пост с медиа (фото, видео)
 */
async function sendPostWithPhoto(photoPath, caption, channelId = null) {
  try {
    const chatId = channelId || process.env.TELEGRAM_CHANNEL_ID;
    
    const sentMessage = await bot.sendPhoto(chatId, photoPath, {
      caption: caption,
      parse_mode: 'HTML',
    });
    
    return sentMessage;
  } catch (error) {
    console.error('Ошибка при отправке фото в Telegram:', error);
    throw error;
  }
}

/**
 * Проверяет, что бот может отправлять сообщения в канал
 */
async function testConnection(channelId = null) {
  try {
    const chatId = channelId || process.env.TELEGRAM_CHANNEL_ID;
    const testMessage = '🤖 Бот успешно подключен к каналу!';
    await sendPostToChannel(testMessage, chatId);
    return true;
  } catch (error) {
    console.error('Ошибка подключения к Telegram:', error);
    return false;
  }
}

module.exports = {
  sendPostToChannel,
  sendPostWithPhoto,
  testConnection,
  bot, // Экспортируем бота для дополнительных операций
};


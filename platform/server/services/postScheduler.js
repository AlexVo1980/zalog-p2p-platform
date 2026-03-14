const cron = require('node-cron');
const { generatePost } = require('./gptService');
const { sendPostToChannel } = require('./telegramService');

let scheduledTasks = [];

/**
 * Запускает автоматическую отправку постов по расписанию
 * @param {string} schedule - Cron выражение (например: '0 10 * * *' - каждый день в 10:00)
 * @param {object} options - Опции (topic, style, channelId)
 */
function scheduleAutoPosts(schedule = '0 10 * * *', options = {}) {
  // Останавливаем предыдущие задачи
  stopAllScheduledPosts();

  const task = cron.schedule(schedule, async () => {
    try {
      console.log(`[${new Date().toISOString()}] Генерация и отправка поста...`);
      
      // Генерируем пост с помощью GPT
      const post = await generatePost(options.topic, options.style);
      
      // Отправляем в Telegram
      await sendPostToChannel(post, options.channelId);
      
      console.log(`[${new Date().toISOString()}] Пост успешно отправлен`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Ошибка при автоматической отправке поста:`, error);
    }
  }, {
    scheduled: true,
    timezone: process.env.TIMEZONE || 'Europe/Moscow',
  });

  scheduledTasks.push(task);
  console.log(`Автоматическая отправка постов запланирована: ${schedule}`);
  
  return task;
}

/**
 * Останавливает все запланированные задачи
 */
function stopAllScheduledPosts() {
  scheduledTasks.forEach(task => task.stop());
  scheduledTasks = [];
  console.log('Все запланированные задачи остановлены');
}

/**
 * Отправляет пост прямо сейчас (для тестирования)
 */
async function sendPostNow(options = {}) {
  try {
    console.log('Генерация и отправка поста...');
    const post = await generatePost(options.topic, options.style);
    await sendPostToChannel(post, options.channelId);
    console.log('Пост успешно отправлен');
    return post;
  } catch (error) {
    console.error('Ошибка при отправке поста:', error);
    throw error;
  }
}

module.exports = {
  scheduleAutoPosts,
  stopAllScheduledPosts,
  sendPostNow,
};


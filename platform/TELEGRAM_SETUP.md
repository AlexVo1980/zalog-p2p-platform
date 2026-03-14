# Настройка автоматической отправки постов в Telegram

## Шаги настройки

### 1. Получите API ключи

#### OpenAI API Key
1. Перейдите на https://platform.openai.com/api-keys
2. Создайте новый API ключ
3. Скопируйте ключ

#### Telegram Bot Token
1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните токен, который выдаст BotFather

### 2. Настройте Telegram канал

1. Создайте канал в Telegram или используйте существующий
2. Добавьте бота в канал как администратора:
   - Откройте канал → Управление каналом → Администраторы
   - Добавьте вашего бота
   - Дайте права на отправку сообщений

3. Получите ID канала:
   - Для публичного канала: используйте `@channel_username`
   - Для приватного канала: используйте бота [@userinfobot](https://t.me/userinfobot) или [@getidsbot](https://t.me/getidsbot)

### 3. Обновите файл .env

Добавьте следующие переменные в файл `.env` в корне проекта:

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHANNEL_ID=@your_channel_username
# или числовой ID: -1001234567890

# Настройки автоматической отправки (опционально)
AUTO_POST_ENABLED=false
AUTO_POST_SCHEDULE=0 10 * * *
AUTO_POST_TOPIC=
AUTO_POST_STYLE=профессиональный
TIMEZONE=Europe/Moscow
```

### 4. Перезапустите сервер

После обновления `.env` файла перезапустите сервер:

```bash
# Остановите текущий процесс (Ctrl+C) и запустите снова
npm run server
```

## Использование API

### Тест подключения к Telegram

```bash
curl -X GET "http://localhost:5000/api/telegram-posts/test" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Генерация поста (без отправки)

```bash
curl -X POST "http://localhost:5000/api/telegram-posts/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "topic": "новые возможности для инвесторов",
    "style": "дружелюбный"
  }'
```

### Отправка поста прямо сейчас

```bash
curl -X POST "http://localhost:5000/api/telegram-posts/send-now" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "topic": "займы под залог недвижимости",
    "style": "профессиональный"
  }'
```

### Настройка автоматической отправки

```bash
curl -X POST "http://localhost:5000/api/telegram-posts/schedule" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "schedule": "0 10 * * *",
    "topic": "инвестиции",
    "style": "профессиональный"
  }'
```

### Остановка автоматической отправки

```bash
curl -X POST "http://localhost:5000/api/telegram-posts/stop" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Примеры расписания (Cron)

- `0 10 * * *` - каждый день в 10:00
- `0 */6 * * *` - каждые 6 часов
- `0 9,15,21 * * *` - в 9:00, 15:00 и 21:00
- `0 10 * * 1` - каждый понедельник в 10:00
- `*/30 * * * *` - каждые 30 минут

## Автоматический запуск при старте сервера

Если вы хотите, чтобы автоматическая отправка запускалась при старте сервера, установите в `.env`:

```env
AUTO_POST_ENABLED=true
AUTO_POST_SCHEDULE=0 10 * * *
AUTO_POST_TOPIC=займы под залог
AUTO_POST_STYLE=профессиональный
```

## Примечания

- Все API endpoints требуют авторизации через JWT токен
- Убедитесь, что бот добавлен в канал как администратор
- Проверьте права бота на отправку сообщений
- Для приватных каналов используйте числовой ID, а не username


# Быстрый старт ZalogInvest

## Установка и запуск

### 1. Установите зависимости

```bash
# В корневой директории
npm install

# В директории client
cd client
npm install
cd ..
```

### 2. Настройте MongoDB

Убедитесь, что MongoDB запущен локально или используйте MongoDB Atlas.

Для локального запуска:
```bash
mongod
```

### 3. Настройте переменные окружения

Создайте файл `.env` в корневой директории:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/zaloginvest
JWT_SECRET=your-secret-key-change-in-production
CLIENT_URL=http://localhost:3000
```

### 4. Запустите приложение

```bash
# Запуск frontend и backend одновременно
npm run dev

# Или отдельно:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Откройте в браузере

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Тестовые аккаунты

После первого запуска создайте аккаунты через форму регистрации:
- Заемщик (borrower)
- Инвестор (investor)
- Брокер (broker)
- Администратор (admin) - создайте вручную в базе данных

## Структура проекта

```
zaloginvest-platform/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root dependencies
└── README.md        # Полная документация
```

## Основные функции

✅ Регистрация и авторизация с выбором роли
✅ Личные кабинеты для всех ролей
✅ Размещение заявок на займы
✅ Лента заявок для инвесторов
✅ Админ-панель для управления
✅ Темная/светлая тема
✅ Адаптивный дизайн

## Troubleshooting

### Проблемы с MongoDB
- Убедитесь, что MongoDB запущен
- Проверьте строку подключения в .env

### Проблемы с портами
- Убедитесь, что порты 3000 и 5000 свободны
- Измените порты в .env и package.json при необходимости

### Проблемы с зависимостями
- Удалите node_modules и package-lock.json
- Выполните npm install заново


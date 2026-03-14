# 📖 Подробная инструкция по установке и запуску проекта ZalogInvest

Данная инструкция поможет вам пошагово установить и запустить проект ZalogInvest на вашем компьютере.

---

## 📋 Содержание

1. [Предварительные требования](#предварительные-требования)
2. [Установка необходимого ПО](#установка-необходимого-по)
3. [Подготовка проекта](#подготовка-проекта)
4. [Настройка базы данных MongoDB](#настройка-базы-данных-mongodb)
5. [Настройка переменных окружения](#настройка-переменных-окружения)
6. [Установка зависимостей](#установка-зависимостей)
7. [Запуск проекта](#запуск-проекта)
8. [Проверка работоспособности](#проверка-работоспособности)
9. [Решение проблем](#решение-проблем)

---

## 🔧 Предварительные требования

Перед началом установки убедитесь, что на вашем компьютере установлены следующие программы:

### Обязательные требования:

1. **Node.js** (версия 16 или выше)
   - Проверить версию: `node --version`
   - Скачать: https://nodejs.org/

2. **npm** (обычно устанавливается вместе с Node.js)
   - Проверить версию: `npm --version`
   - Если не установлен: https://www.npmjs.com/get-npm

3. **MongoDB** (локально или доступ к MongoDB Atlas)
   - Локальная установка: https://www.mongodb.com/try/download/community
   - Или используйте MongoDB Atlas (облачная версия): https://www.mongodb.com/cloud/atlas

4. **Git** (для клонирования репозитория)
   - Проверить версию: `git --version`
   - Скачать: https://git-scm.com/downloads

---

## 💻 Установка необходимого ПО

### Шаг 1: Установка Node.js и npm

1. Перейдите на сайт https://nodejs.org/
2. Скачайте LTS версию (рекомендуется)
3. Запустите установщик и следуйте инструкциям
4. Откройте терминал и проверьте установку:

```bash
node --version
npm --version
```

Вы должны увидеть версии, например: `v18.17.0` и `9.6.7`

### Шаг 2: Установка MongoDB

#### Вариант А: Локальная установка MongoDB

**Для macOS:**

**Способ 1: Установка через официальный установщик (рекомендуется, если нет Homebrew)**

1. Перейдите на https://www.mongodb.com/try/download/community
2. Выберите:
   - Version: Последняя стабильная версия
   - Platform: macOS
   - Package: TGZ (или подходящий для вашей системы)
3. Скачайте архив и распакуйте его
4. Переместите MongoDB в удобное место:
   ```bash
   # Например, в /usr/local/mongodb
   sudo mkdir -p /usr/local/mongodb
   sudo cp -R ~/Downloads/mongodb-macos-*/* /usr/local/mongodb/
   ```
5. Создайте директорию для данных:
   ```bash
   sudo mkdir -p /data/db
   sudo chown $(whoami) /data/db
   ```
6. Добавьте MongoDB в PATH (опционально):
   ```bash
   echo 'export PATH="/usr/local/mongodb/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```
7. Запустите MongoDB:
   ```bash
   mongod
   ```

**Способ 2: Установка через Homebrew (если Homebrew установлен)**

Сначала установите Homebrew, если его нет:

```bash
# Установка Homebrew (выполните в терминале)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# После установки следуйте инструкциям на экране
# Может потребоваться добавить brew в PATH:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Затем установите MongoDB:

```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Для Windows:**

1. Перейдите на https://www.mongodb.com/try/download/community
2. Выберите:
   - Version: Последняя стабильная версия
   - Platform: Windows
   - Package: MSI
3. Скачайте и запустите MSI установщик
4. Следуйте инструкциям мастера установки
5. После установки MongoDB будет доступен как служба Windows

**Для Linux:**

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Запуск MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Вариант Б: Использование MongoDB Atlas (рекомендуется для начала)

1. Зарегистрируйтесь на https://www.mongodb.com/cloud/atlas
2. Создайте бесплатный кластер (M0 Sandbox)
3. Создайте пользователя базы данных
4. Получите строку подключения (Connection String)

---

## 📦 Подготовка проекта

### Шаг 1: Клонирование репозитория

Если у вас есть доступ к репозиторию через Git:

```bash
# Перейдите в папку, где хотите разместить проект
cd ~/Projects  # или любая другая папка

# Клонируйте репозиторий
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ> zaloginvest-platform

# Перейдите в папку проекта
cd zaloginvest-platform
```

**Если проект уже скачан:**

```bash
# Просто перейдите в папку проекта
cd путь/к/zaloginvest-platform
```

### Шаг 2: Проверка структуры проекта

Убедитесь, что структура проекта выглядит следующим образом:

```
zaloginvest-platform/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Корневой package.json
└── README.md
```

---

## 🗄️ Настройка базы данных MongoDB

### Вариант А: Локальная MongoDB

1. **Запустите MongoDB сервер:**

   **macOS (через Homebrew):**
   ```bash
   # Запуск как служба (автозапуск)
   brew services start mongodb-community
   
   # Или запуск вручную (в текущей сессии)
   mongod --config /usr/local/etc/mongod.conf
   ```

   **macOS (через официальный установщик):**
   ```bash
   # Если MongoDB добавлен в PATH
   mongod
   
   # Или с полным путём
   /usr/local/mongodb/bin/mongod
   
   # Для запуска в фоновом режиме
   mongod --fork --logpath /usr/local/var/log/mongodb/mongo.log
   ```

   **Linux:**
   ```bash
   # Через systemd
   sudo systemctl start mongod
   sudo systemctl enable mongod  # автозапуск при загрузке
   
   # Или вручную
   sudo mongod
   ```

   **Windows:**
   ```bash
   # Через службы Windows (если установлен как служба)
   net start MongoDB
   
   # Или через командную строку (путь может отличаться)
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
   ```

2. **Проверьте, что MongoDB запущен:**
   ```bash
   # Подключитесь к MongoDB
   mongosh
   
   # Или если mongosh не в PATH:
   # /usr/local/mongodb/bin/mongosh  (macOS с официальным установщиком)
   
   # Вы должны увидеть приглашение MongoDB shell:
   # Current Mongosh Log ID: ...
   # Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
   # Using MongoDB: 7.x.x
   # Using Mongosh: x.x.x
   # >
   
   # Для выхода введите: exit
   ```

3. **Создайте директорию для данных (если нужно):**
   ```bash
   # macOS/Linux
   sudo mkdir -p /data/db
   sudo chown $(whoami) /data/db
   
   # Или используйте альтернативную директорию при запуске:
   mongod --dbpath ~/data/db
   ```

3. **Строка подключения:**
   ```
   mongodb://localhost:27017/zaloginvest
   ```

### Вариант Б: MongoDB Atlas

1. **Создайте кластер:**
   - Войдите в MongoDB Atlas
   - Нажмите "Build a Database"
   - Выберите бесплатный вариант M0
   - Выберите регион (ближайший к вам)

2. **Создайте пользователя базы данных:**
   - Перейдите в "Database Access"
   - Нажмите "Add New Database User"
   - Создайте пользователя и пароль (сохраните их!)

3. **Настройте сетевой доступ:**
   - Перейдите в "Network Access"
   - Нажмите "Add IP Address"
   - Выберите "Allow Access from Anywhere" (0.0.0.0/0) для разработки

4. **Получите строку подключения:**
   - Перейдите в "Database" → "Connect"
   - Выберите "Connect your application"
   - Скопируйте строку подключения, она будет выглядеть так:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zaloginvest?retryWrites=true&w=majority
   ```

---

## ⚙️ Настройка переменных окружения

### Шаг 1: Создание файла .env

В корневой папке проекта создайте файл `.env`:

```bash
# Перейдите в корневую папку проекта
cd /Users/aleksandr/zaloginvest-platform

# Создайте файл .env
touch .env
```

### Шаг 2: Заполнение файла .env

Откройте файл `.env` в текстовом редакторе и добавьте следующие переменные:

```env
# Порт для сервера
PORT=5000

# Режим работы (development или production)
NODE_ENV=development

# Строка подключения к MongoDB
# Для локальной MongoDB:
MONGODB_URI=mongodb://localhost:27017/zaloginvest

# Для MongoDB Atlas (замените на вашу строку):
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zaloginvest?retryWrites=true&w=majority

# Секретный ключ для JWT токенов (используйте длинную случайную строку!)
# Генерация случайной строки: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-super-secret-key-change-this-in-production-use-long-random-string

# URL клиентского приложения
CLIENT_URL=http://localhost:3000
```

**⚠️ Важно:**
- Для `JWT_SECRET` используйте длинную случайную строку (минимум 32 символа)
- Никогда не коммитьте файл `.env` в репозиторий (он уже в .gitignore)
- В production используйте безопасный способ хранения секретов

### Шаг 3: Настройка переменных для клиента (опционально)

Если нужно изменить URL API на клиенте, создайте файл `.env` в папке `client/`:

```bash
cd client
touch .env
```

Добавьте в `client/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

**Примечание:** По умолчанию клиент использует `http://localhost:5000`, поэтому этот шаг необязателен.

---

## 📥 Установка зависимостей

Проект имеет двухуровневую структуру зависимостей:
- Зависимости корневого проекта (backend)
- Зависимости клиента (frontend)

### Способ 1: Автоматическая установка (рекомендуется)

В корневой папке проекта выполните:

```bash
npm run install-all
```

Эта команда автоматически установит зависимости для корневого проекта и для клиента.

### Способ 2: Ручная установка

Если предпочитаете устанавливать вручную:

```bash
# 1. Установка зависимостей корневого проекта
npm install

# 2. Установка зависимостей клиента
cd client
npm install
cd ..
```

### Проверка установки

После установки убедитесь, что появились папки `node_modules`:

```bash
# В корневой папке
ls -la node_modules  # должна существовать

# В папке client
ls -la client/node_modules  # должна существовать
```

**Примечание:** Установка может занять несколько минут в зависимости от скорости интернета.

---

## 🚀 Запуск проекта

Теперь все готово для запуска проекта!

### Способ 1: Запуск frontend и backend одновременно (рекомендуется)

В корневой папке проекта выполните:

```bash
npm run dev
```

Эта команда запустит:
- Backend сервер на порту 5000
- Frontend приложение на порту 3000

**Что вы увидите:**
- В терминале появятся логи от обоих процессов
- Backend: `Server running on port 5000` и `MongoDB connected`
- Frontend: автоматически откроется браузер на `http://localhost:3000`

### Способ 2: Запуск в отдельных терминалах

Если хотите видеть логи отдельно:

**Терминал 1 - Backend:**
```bash
npm run server
```

**Терминал 2 - Frontend:**
```bash
npm run client
```

### Ожидаемый вывод в терминале

**Backend (терминал 1):**
```
MongoDB connected
Server running on port 5000
```

**Frontend (терминал 2 или автоматически):**
```
Compiled successfully!

You can now view zaloginvest-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## ✅ Проверка работоспособности

### Шаг 1: Проверка Backend API

1. Откройте браузер или используйте curl:
   ```bash
   curl http://localhost:5000/api/news
   ```

2. Должен вернуться ответ (например, пустой массив `[]` или список новостей)

3. Если видите ошибку, проверьте:
   - Запущен ли сервер
   - Правильно ли настроен MongoDB
   - Корректны ли переменные в `.env`

### Шаг 2: Проверка Frontend

1. Откройте браузер: http://localhost:3000

2. Должна открыться главная страница ZalogInvest

3. Попробуйте:
   - Перейти на страницу регистрации (`/register`)
   - Зарегистрировать тестового пользователя
   - Войти в систему (`/login`)

### Шаг 3: Создание тестовых аккаунтов

1. **Заемщик (Borrower):**
   - Перейдите на `/register`
   - Выберите роль "Заемщик"
   - Заполните форму и зарегистрируйтесь

2. **Инвестор (Investor):**
   - Зарегистрируйте второго пользователя с ролью "Инвестор"

3. **Брокер (Broker):**
   - Зарегистрируйте третьего пользователя с ролью "Брокер"

4. **Администратор (Admin):**
   - Администратора нужно создать вручную в базе данных (см. ниже)

### Шаг 4: Создание администратора в базе данных

Подключитесь к MongoDB:

```bash
mongosh
```

Выполните следующие команды:

```javascript
// Подключение к базе данных
use zaloginvest

// Создание администратора (замените email, password на свои значения)
db.users.insertOne({
  email: "admin@zaloginvest.ru",
  password: "$2a$10$примерХешированногоПароля", // Используйте bcrypt для хеширования
  role: "admin",
  name: "Администратор",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Или используйте API для регистрации и затем измените роль через MongoDB:**

1. Зарегистрируйте пользователя через форму
2. Подключитесь к MongoDB
3. Измените роль:

```javascript
use zaloginvest
db.users.updateOne(
  { email: "ваш-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🔍 Решение проблем

### Проблема 1: Ошибка "MongoDB connection error"

**Причины:**
- MongoDB не запущен
- Неправильная строка подключения в `.env`
- Проблемы с сетевым доступом (для Atlas)
- MongoDB не установлен

**Решения:**
1. Проверьте, запущен ли MongoDB:
   ```bash
   # Проверка процесса
   ps aux | grep mongod  # macOS/Linux
   # или
   Get-Process mongod    # Windows PowerShell
   ```

2. Если MongoDB не запущен, попробуйте запустить:
   ```bash
   # macOS (через Homebrew)
   brew services start mongodb-community
   
   # macOS (официальный установщик)
   mongod
   # или
   /usr/local/mongodb/bin/mongod
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

3. Если команда `mongod` не найдена:
   - Убедитесь, что MongoDB установлен (см. раздел "Установка MongoDB")
   - Проверьте, что MongoDB добавлен в PATH
   - Используйте полный путь к исполняемому файлу

4. Проверьте строку подключения в `.env`

5. Для MongoDB Atlas: убедитесь, что ваш IP адрес добавлен в Network Access

6. Если не можете запустить локальный MongoDB, используйте MongoDB Atlas (бесплатный вариант)

### Проблема 2: "command not found: brew" (macOS)

**Ошибка:** `zsh: command not found: brew`

**Причина:**
Homebrew не установлен на вашей системе.

**Решения:**

**Вариант 1: Установить Homebrew**
```bash
# Установка Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# После установки добавьте brew в PATH (следуйте инструкциям на экране):
# Для Apple Silicon Mac:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"

# Для Intel Mac:
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/usr/local/bin/brew shellenv)"

# Проверьте установку
brew --version
```

**Вариант 2: Установить MongoDB без Homebrew**
Используйте официальный установщик MongoDB (см. раздел "Установка MongoDB → Вариант А → Для macOS → Способ 1").

**Вариант 3: Использовать MongoDB Atlas (рекомендуется)**
Используйте облачную версию MongoDB (см. раздел "Установка MongoDB → Вариант Б").

### Проблема 3: Порт уже занят

**Ошибка:** `EADDRINUSE: address already in use :::5000`

**Решения:**
1. Найдите процесс, занимающий порт:
   ```bash
   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. Или измените порт в `.env`:
   ```env
   PORT=5001
   ```
   И не забудьте обновить `CLIENT_URL` если нужно.

### Проблема 4: Ошибки при установке зависимостей

**Ошибка:** `npm ERR!` или проблемы с node_modules

**Решения:**
1. Очистите кэш npm:
   ```bash
   npm cache clean --force
   ```

2. Удалите node_modules и установите заново:
   ```bash
   # В корневой папке
   rm -rf node_modules package-lock.json
   npm install
   
   # В папке client
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Проверьте версию Node.js (должна быть 16+):
   ```bash
   node --version
   ```

### Проблема 5: Frontend не подключается к Backend

**Симптомы:** Ошибки CORS или 404 при запросах к API

**Решения:**
1. Убедитесь, что backend запущен на порту 5000

2. Проверьте переменную `REACT_APP_API_URL` в `client/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

3. Убедитесь, что `CLIENT_URL` в корневом `.env` указан правильно:
   ```env
   CLIENT_URL=http://localhost:3000
   ```

4. Перезапустите frontend после изменения `.env`

### Проблема 6: Ошибки компиляции React

**Ошибка:** `Module not found` или другие ошибки импорта

**Решения:**
1. Убедитесь, что все зависимости установлены:
   ```bash
   cd client
   npm install
   ```

2. Удалите кэш и перезапустите:
   ```bash
   cd client
   rm -rf node_modules/.cache
   npm start
   ```

### Проблема 7: JWT ошибки авторизации

**Ошибка:** `Invalid token` или проблемы с авторизацией

**Решения:**
1. Убедитесь, что `JWT_SECRET` в `.env` установлен и достаточно длинный (минимум 32 символа)

2. Очистите localStorage в браузере:
   - Откройте DevTools (F12)
   - Application → Local Storage → очистите данные

3. Попробуйте зарегистрироваться заново

---

## 📚 Дополнительная информация

### Структура проекта

```
zaloginvest-platform/
├── client/                 # React frontend приложение
│   ├── public/            # Статические файлы
│   ├── src/               # Исходный код
│   │   ├── components/    # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── services/      # API сервисы
│   │   ├── context/       # React Context
│   │   └── App.js         # Главный компонент
│   └── package.json       # Зависимости frontend
├── server/                # Express backend приложение
│   ├── models/           # MongoDB модели
│   ├── routes/           # API маршруты
│   ├── middleware/       # Express middleware
│   ├── config/           # Конфигурационные файлы
│   └── index.js          # Точка входа сервера
├── .env                   # Переменные окружения (не в репозитории)
├── .gitignore            # Игнорируемые файлы Git
├── package.json          # Зависимости backend и скрипты
└── README.md             # Основная документация
```

### Доступные npm скрипты

В корневой папке:

- `npm run dev` - Запуск frontend и backend одновременно
- `npm run server` - Запуск только backend сервера
- `npm run client` - Запуск только frontend приложения
- `npm run build` - Сборка production версии frontend
- `npm run install-all` - Установка всех зависимостей

### Полезные команды для разработки

```bash
# Просмотр логов MongoDB
tail -f /usr/local/var/log/mongodb/mongo.log  # macOS

# Проверка статуса MongoDB (macOS)
brew services list

# Перезапуск MongoDB (macOS)
brew services restart mongodb-community

# Просмотр подключенных к MongoDB клиентов
mongosh
use zaloginvest
db.currentOp()
```

---

## 🎉 Готово!

Если вы выполнили все шаги и проект успешно запустился, поздравляем! 

Теперь вы можете:
- Открыть http://localhost:3000 в браузере
- Зарегистрировать пользователей с разными ролями
- Протестировать функциональность платформы

При возникновении проблем обращайтесь к разделу [Решение проблем](#решение-проблем) или создайте issue в репозитории.

---

**Последнее обновление:** 2024


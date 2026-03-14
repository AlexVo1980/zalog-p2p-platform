# Быстрый старт мобильного приложения

## ✅ Выполненные действия

1. ✅ Создана структура React Native проекта
2. ✅ Настроены конфигурационные файлы Android
3. ✅ Созданы основные экраны и компоненты
4. ✅ Настроен API URL (192.168.31.109:5000 для устройства, 10.0.2.2:5000 для эмулятора)

## 📋 Следующие шаги

### 1. Установите зависимости

```bash
cd mobile
npm install
```

Если возникнут проблемы с правами, попробуйте:
```bash
sudo npm install
```
или
```bash
npm install --legacy-peer-deps
```

### 2. Убедитесь, что сервер запущен

В корне проекта:
```bash
npm run server
```

Сервер должен работать на `http://localhost:5000`

### 3. Настройте Android окружение

#### Проверьте переменные окружения:

```bash
echo $ANDROID_HOME
```

Если пусто, добавьте в `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Затем:
```bash
source ~/.zshrc
```

### 4. Запустите Metro bundler

```bash
cd mobile
npm start
```

### 5. Запустите приложение

В новом терминале:

#### Вариант A: Через командную строку
```bash
cd mobile
npm run android
```

#### Вариант B: Через Android Studio
1. Откройте Android Studio
2. File → Open → выберите папку `mobile/android`
3. Дождитесь синхронизации Gradle
4. Нажмите Run (▶️)

## 🔧 Настройка для физического устройства

1. Убедитесь, что телефон и компьютер в одной Wi-Fi сети
2. Проверьте IP адрес компьютера:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
3. Если IP изменился, обновите в `mobile/src/services/api.js`:
   ```javascript
   const API_URL = 'http://ВАШ_IP:5000';
   ```

## 📱 Тестирование

После запуска приложения:

1. Откроется экран входа
2. Зарегистрируйте нового пользователя или войдите
3. После входа откроется дашборд заемщика

## ⚠️ Решение проблем

### Ошибка "SDK location not found"
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### Ошибка подключения к серверу
- Проверьте, что сервер запущен: `curl http://localhost:5000/api/news`
- Для устройства: убедитесь, что IP адрес правильный
- Проверьте firewall настройки

### Ошибка при сборке
```bash
cd mobile/android
./gradlew clean
cd ..
npm run android
```

### Очистка кэша
```bash
cd mobile
npm start -- --reset-cache
```

## 📦 Сборка APK

### Debug версия
```bash
cd mobile/android
./gradlew assembleDebug
```

APK: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`

### Установка на устройство
```bash
adb install app-debug.apk
```

## 🎯 Готово!

Приложение готово к использованию. Для разработки используйте:
- Hot Reload (автоматически работает)
- React Native Debugger
- Chrome DevTools (через меню разработчика)


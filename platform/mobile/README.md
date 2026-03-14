# ЗалогИнвест - Мобильное приложение для Android

Мобильное приложение для платформы займов под залог имущества, созданное с помощью React Native.

## Требования

- Node.js >= 16
- React Native CLI
- Android Studio
- JDK 11 или выше
- Android SDK (API Level 21+)

## Установка

### 1. Установите зависимости

```bash
cd mobile
npm install
```

### 2. Настройте Android окружение

Убедитесь, что у вас установлены:
- Android Studio
- Android SDK (через Android Studio SDK Manager)
- Переменные окружения:
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/tools
  export PATH=$PATH:$ANDROID_HOME/tools/bin
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

### 3. Настройте API URL

Откройте `src/services/api.js` и измените `API_URL`:

```javascript
// Для эмулятора Android
const API_URL = 'http://10.0.2.2:5000';

// Для физического устройства (замените на IP вашего компьютера)
const API_URL = 'http://192.168.1.100:5000';
```

### 4. Запустите Metro bundler

```bash
npm start
```

### 5. Запустите приложение на Android

В новом терминале:

```bash
npm run android
```

Или через Android Studio:
1. Откройте Android Studio
2. Откройте папку `mobile/android`
3. Дождитесь синхронизации Gradle
4. Запустите приложение (Run)

## Структура проекта

```
mobile/
├── android/              # Нативные Android файлы
├── src/
│   ├── screens/         # Экраны приложения
│   │   ├── auth/        # Экран авторизации
│   │   └── dashboard/   # Дашборды
│   ├── context/         # React Context (AuthContext)
│   └── services/        # API сервисы
├── App.js               # Главный компонент
├── index.js             # Точка входа
└── package.json         # Зависимости
```

## Основные функции

- ✅ Авторизация и регистрация
- ✅ Личный кабинет заемщика
- ✅ Просмотр залогов
- ✅ Просмотр заявок
- ✅ Интеграция с API сервером

## Разработка

### Добавление новых экранов

1. Создайте компонент в `src/screens/`
2. Добавьте маршрут в `App.js`:

```javascript
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### Работа с API

Используйте готовый сервис `api.js`:

```javascript
import api from '../services/api';

// GET запрос
const response = await api.get('/api/endpoint');

// POST запрос
const response = await api.post('/api/endpoint', { data });
```

## Сборка APK

### Debug APK

```bash
cd android
./gradlew assembleDebug
```

APK будет в `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

1. Создайте keystore (если еще нет):
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Настройте `android/gradle.properties`:
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3. Соберите release:
```bash
cd android
./gradlew assembleRelease
```

## Решение проблем

### Ошибка "SDK location not found"
Установите переменную окружения `ANDROID_HOME`

### Ошибка подключения к серверу
- Убедитесь, что сервер запущен
- Проверьте IP адрес в `api.js`
- Для физического устройства убедитесь, что телефон и компьютер в одной сети
- Проверьте firewall настройки

### Ошибка "Unable to resolve module"
```bash
npm start -- --reset-cache
```

## Дополнительные ресурсы

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)


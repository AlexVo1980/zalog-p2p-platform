# Настройка мобильного приложения для Android

## Быстрый старт

### 1. Установите зависимости

```bash
cd mobile
npm install
```

### 2. Настройте Android окружение

#### macOS/Linux:

Добавьте в `~/.zshrc` или `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Затем выполните:
```bash
source ~/.zshrc  # или source ~/.bashrc
```

#### Windows:

Добавьте в переменные окружения:
- `ANDROID_HOME` = `C:\Users\YourUsername\AppData\Local\Android\Sdk`
- Добавьте в `PATH`:
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`

### 3. Настройте API URL

Откройте `mobile/src/services/api.js` и измените:

```javascript
// Для эмулятора Android
const API_URL = 'http://10.0.2.2:5000';

// Для физического устройства (замените на IP вашего компьютера)
// Узнайте IP: ifconfig (macOS/Linux) или ipconfig (Windows)
const API_URL = 'http://192.168.1.XXX:5000';
```

### 4. Запустите сервер

В корне проекта:
```bash
npm run server
```

### 5. Запустите Metro bundler

```bash
cd mobile
npm start
```

### 6. Запустите приложение

В новом терминале:
```bash
cd mobile
npm run android
```

## Структура приложения

```
mobile/
├── android/                 # Нативные Android файлы
│   ├── app/
│   │   ├── build.gradle    # Конфигурация сборки
│   │   └── src/
│   │       └── main/
│   │           ├── AndroidManifest.xml
│   │           └── java/com/zaloginvest/
│   ├── build.gradle
│   └── settings.gradle
├── src/
│   ├── screens/            # Экраны приложения
│   │   ├── auth/          # Авторизация
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   └── dashboard/     # Дашборды
│   │       └── BorrowerDashboard.js
│   ├── context/           # React Context
│   │   └── AuthContext.js
│   └── services/         # API сервисы
│       └── api.js
├── App.js                 # Главный компонент
├── index.js              # Точка входа
└── package.json
```

## Основные функции

- ✅ Авторизация и регистрация пользователей
- ✅ Личный кабинет заемщика
- ✅ Просмотр залогов и заявок
- ✅ Интеграция с API сервером
- ✅ Сохранение токена авторизации

## Сборка APK

### Debug версия

```bash
cd mobile/android
./gradlew assembleDebug
```

APK будет в: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`

### Release версия

1. Создайте keystore:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Добавьте в `mobile/android/gradle.properties`:
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=ваш_пароль
MYAPP_RELEASE_KEY_PASSWORD=ваш_пароль
```

3. Соберите:
```bash
cd mobile/android
./gradlew assembleRelease
```

APK будет в: `mobile/android/app/build/outputs/apk/release/app-release.apk`

## Решение проблем

### Ошибка "SDK location not found"
- Убедитесь, что `ANDROID_HOME` установлен
- Проверьте путь к Android SDK

### Ошибка подключения к серверу
- Проверьте, что сервер запущен на порту 5000
- Для физического устройства: убедитесь, что телефон и компьютер в одной Wi-Fi сети
- Проверьте IP адрес в `api.js`
- Отключите firewall или добавьте исключение

### Ошибка "Unable to resolve module"
```bash
cd mobile
npm start -- --reset-cache
rm -rf node_modules
npm install
```

### Ошибка при сборке Gradle
```bash
cd mobile/android
./gradlew clean
cd ..
npm run android
```

## Дополнительные настройки

### Изменение названия приложения

Отредактируйте `mobile/android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">Ваше название</string>
```

### Изменение package name

1. Измените `applicationId` в `mobile/android/app/build.gradle`
2. Переместите файлы в `mobile/android/app/src/main/java/com/ваш_пакет/`
3. Обновите импорты в Java/Kotlin файлах

## Следующие шаги

- [ ] Добавить экраны для инвесторов и брокеров
- [ ] Добавить загрузку документов
- [ ] Добавить push-уведомления
- [ ] Добавить офлайн режим
- [ ] Улучшить UI/UX дизайн
- [ ] Добавить тесты


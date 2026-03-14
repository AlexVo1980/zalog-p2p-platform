# Инструкция по запуску приложения

## ✅ Текущий статус

- ✅ Зависимости установлены
- ✅ Metro bundler запущен
- ⚠️ Android SDK не настроен

## 🚀 Варианты запуска

### Вариант 1: Установить Android Studio (Рекомендуется)

1. **Скачайте Android Studio**:
   - https://developer.android.com/studio
   - Установите через установщик

2. **Настройте Android SDK**:
   - Откройте Android Studio
   - Tools → SDK Manager
   - Установите:
     - Android SDK Platform 33
     - Android SDK Build-Tools
     - Android Emulator

3. **Настройте переменные окружения**:
   
   Добавьте в `~/.zshrc`:
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

4. **Создайте эмулятор**:
   - Android Studio → Tools → Device Manager
   - Create Device
   - Выберите устройство (например, Pixel 5)
   - Выберите систему (API 33)
   - Finish

5. **Запустите эмулятор**:
   - Запустите созданный эмулятор из Device Manager

6. **Запустите приложение**:
   ```bash
   cd mobile
   npm run android
   ```

### Вариант 2: Использовать физическое устройство

1. **Включите режим разработчика** на Android устройстве:
   - Настройки → О телефоне
   - Нажмите 7 раз на "Номер сборки"

2. **Включите отладку по USB**:
   - Настройки → Для разработчиков → Отладка по USB

3. **Подключите устройство** к компьютеру через USB

4. **Установите ADB** (если еще нет):
   ```bash
   # Через Homebrew
   brew install android-platform-tools
   ```

5. **Проверьте подключение**:
   ```bash
   adb devices
   ```
   Должно показать ваше устройство

6. **Запустите приложение**:
   ```bash
   cd mobile
   npm run android
   ```

### Вариант 3: Собрать APK и установить вручную

1. **Установите Android Studio** (хотя бы для SDK)

2. **Соберите Debug APK**:
   ```bash
   cd mobile/android
   ./gradlew assembleDebug
   ```

3. **Найдите APK**:
   ```
   mobile/android/app/build/outputs/apk/debug/app-debug.apk
   ```

4. **Установите на устройство**:
   - Передайте APK на устройство
   - Откройте файл на устройстве
   - Разрешите установку из неизвестных источников
   - Установите

## 🔧 Быстрая настройка через Homebrew

```bash
# Установить Android SDK через Homebrew
brew install --cask android-studio

# После установки Android Studio:
# 1. Откройте Android Studio
# 2. Настройте SDK (Tools → SDK Manager)
# 3. Добавьте переменные окружения (см. выше)
```

## 📱 Текущий статус Metro bundler

Metro bundler уже запущен в фоне. Вы можете:

1. Открыть браузер на `http://localhost:8081` для проверки
2. После настройки Android SDK запустить:
   ```bash
   cd mobile
   npm run android
   ```

## ⚠️ Важно

- Metro bundler должен быть запущен перед запуском приложения
- Убедитесь, что сервер API работает на `http://localhost:5000`
- Для физического устройства измените API URL в `src/services/api.js`

## 🎯 После настройки

Когда Android SDK будет настроен, просто выполните:

```bash
cd mobile
npm run android
```

Приложение автоматически:
- Подключится к Metro bundler
- Соберет APK
- Установит на устройство/эмулятор
- Запустит приложение


# Создание APK - Текущий статус

## ✅ Что готово

1. ✅ Gradle wrapper создан (`android/gradlew`)
2. ✅ Конфигурация сборки настроена
3. ✅ Скрипт сборки создан (`build-apk.sh`)
4. ✅ Инструкции созданы

## ⚠️ Что нужно для сборки

Для создания APK необходимо установить:

### 1. Android SDK

```bash
# Установите Android Studio
brew install --cask android-studio
```

После установки:
- Откройте Android Studio
- Tools → SDK Manager
- Установите:
  - Android SDK Platform 33
  - Android SDK Build-Tools
  - Android SDK Platform-Tools

### 2. Настройте переменные окружения

Добавьте в `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Затем:
```bash
source ~/.zshrc
```

### 3. Java JDK (версия 11+)

```bash
# Проверка
java -version

# Если нет, установите
brew install openjdk@11
```

## 🚀 После установки Android SDK

### Вариант 1: Использовать скрипт

```bash
cd mobile
./build-apk.sh
```

### Вариант 2: Через Gradle напрямую

```bash
cd mobile/android
./gradlew assembleDebug
```

APK будет создан в:
```
mobile/android/app/build/outputs/apk/debug/app-debug.apk
```

## 📱 Установка APK

### На физическое устройство:

1. Включите режим разработчика на Android
2. Включите отладку по USB
3. Подключите устройство
4. Установите ADB: `brew install android-platform-tools`
5. Установите APK:
   ```bash
   adb install mobile/android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Вручную:

1. Передайте APK файл на устройство
2. Откройте файл на устройстве
3. Разрешите установку из неизвестных источников
4. Установите приложение

## 📋 Чек-лист

- [ ] Android Studio установлен
- [ ] Android SDK Platform 33 установлен
- [ ] ANDROID_HOME настроен
- [ ] Java JDK установлен
- [ ] Переменные окружения обновлены
- [ ] Готов к сборке APK

## 🎯 Следующий шаг

После установки Android SDK выполните:

```bash
cd mobile
./build-apk.sh
```

Или:

```bash
cd mobile/android
./gradlew assembleDebug
```

## 📖 Подробные инструкции

См. файл `BUILD_APK.md` для детальной информации о:
- Сборке Release APK
- Подписи приложения
- Оптимизации размера
- Решении проблем


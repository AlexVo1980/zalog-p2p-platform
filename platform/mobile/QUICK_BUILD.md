# 🚀 Быстрая сборка APK

## ❌ Проблема: Не установлен Java

Для сборки APK требуется Java JDK (версия 11 или выше).

## ✅ Решение

### 1. Установите Java JDK

```bash
# Через Homebrew
brew install openjdk@11
```

Или скачайте с официального сайта:
https://www.oracle.com/java/technologies/downloads/

### 2. Настройте переменные окружения

Добавьте в `~/.zshrc`:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export PATH=$JAVA_HOME/bin:$PATH
```

Затем:
```bash
source ~/.zshrc
```

### 3. Проверьте установку

```bash
java -version
```

Должно показать версию Java 11 или выше.

## 📍 Правильный путь для сборки

Вы должны находиться в папке проекта:

```bash
# Перейдите в папку проекта
cd /Users/aleksandr/zaloginvest-platform/mobile

# Затем запустите сборку
npm run build:apk
```

**Или одной командой:**

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile && npm run build:apk
```

## ⚠️ Также требуется Android SDK

Для сборки APK также нужен Android SDK:

1. Установите Android Studio:
   ```bash
   brew install --cask android-studio
   ```

2. Настройте переменные:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

3. Установите Android SDK Platform 33 через Android Studio

## 🎯 После установки Java и Android SDK

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
npm run build:apk
```

APK будет в:
```
/Users/aleksandr/zaloginvest-platform/mobile/android/app/build/outputs/apk/debug/app-debug.apk
```


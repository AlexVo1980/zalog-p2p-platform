# 🎯 Финальные инструкции по сборке APK

## ✅ Что уже сделано

1. ✅ Java установлена и настроена
2. ✅ Gradle wrapper скачан
3. ✅ Android SDK настроен (local.properties)
4. ✅ Зависимости установлены
5. ✅ Конфигурация исправлена

## ⚠️ Текущая проблема

**StackOverflowError** - циклическая зависимость в Gradle. Это известная проблема с некоторыми версиями React Native и Gradle.

## 🔧 Решения

### Решение 1: Обновить Gradle (рекомендуется)

Попробуйте обновить версию Gradle в `android/gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0-all.zip
```

Затем:
```bash
cd /Users/aleksandr/zaloginvest-platform/mobile/android
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
./gradlew assembleDebug
```

### Решение 2: Использовать React Native CLI

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
npx react-native run-android --no-packager
```

### Решение 3: Собрать через Android Studio

1. Откройте Android Studio
2. File → Open → выберите `mobile/android`
3. Дождитесь синхронизации Gradle
4. Build → Build Bundle(s) / APK(s) → Build APK(s)

### Решение 4: Упростить проект

Удалите проблемные зависимости или используйте более стабильную версию React Native.

## 📋 Команды для быстрой проверки

```bash
# Настройка Java
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Очистка
cd /Users/aleksandr/zaloginvest-platform/mobile/android
./gradlew clean
./gradlew --stop

# Сборка
./gradlew assembleDebug
```

## 🎯 Рекомендация

Попробуйте **Решение 3** (через Android Studio) - это самый надежный способ для первого раза.

После успешной сборки APK будет в:
```
mobile/android/app/build/outputs/apk/debug/app-debug.apk
```


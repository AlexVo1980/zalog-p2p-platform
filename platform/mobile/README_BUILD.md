# ⚠️ Проблема и решение

## ❌ Ошибка

Вы пытались выполнить команду из неправильной директории:
```bash
cd mobile  # ❌ Неправильно - вы были в домашней директории
```

## ✅ Правильная команда

Выполните из **домашней директории**:

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
npm run build:apk
```

**Или одной строкой:**

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile && npm run build:apk
```

## ⚠️ Дополнительная проблема: Java не установлена

Для сборки APK требуется **Java JDK 11 или выше**.

### Установка Java:

```bash
# Установите через Homebrew
brew install openjdk@11

# Настройте переменные (добавьте в ~/.zshrc)
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export PATH=$JAVA_HOME/bin:$PATH

# Примените изменения
source ~/.zshrc

# Проверьте
java -version
```

## 📋 Полный чек-лист для сборки APK

1. ✅ **Зависимости установлены** (уже готово)
2. ❌ **Java JDK** - нужно установить
3. ❌ **Android SDK** - нужно установить через Android Studio
4. ❌ **Переменные окружения** - нужно настроить

## 🚀 После установки всего необходимого

```bash
# Правильный путь
cd /Users/aleksandr/zaloginvest-platform/mobile

# Сборка APK
npm run build:apk
```

## 📍 Где будет APK

После успешной сборки:
```
/Users/aleksandr/zaloginvest-platform/mobile/android/app/build/outputs/apk/debug/app-debug.apk
```


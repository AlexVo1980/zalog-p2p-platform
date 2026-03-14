# ☕ Установка Java для сборки APK

## ❌ Проблема

При попытке собрать APK возникает ошибка:
```
The operation couldn’t be completed. Unable to locate a Java Runtime.
```

## ✅ Решение: Установка Java JDK

### Вариант 1: Через Homebrew (рекомендуется)

Если Homebrew установлен:

```bash
# Установка OpenJDK 11
brew install openjdk@11

# Настройка переменных окружения
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 11)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc

# Применить изменения
source ~/.zshrc

# Проверка
java -version
```

Если Homebrew не установлен, сначала установите его:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Вариант 2: Скачать с официального сайта

1. Перейдите на: https://www.oracle.com/java/technologies/downloads/#java11
2. Скачайте JDK 11 для macOS
3. Установите .dmg файл
4. Настройте переменные:

```bash
# Добавьте в ~/.zshrc
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

# Применить
source ~/.zshrc
```

### Вариант 3: Использовать SDKMAN (альтернатива)

```bash
# Установите SDKMAN
curl -s "https://get.sdkman.io" | bash

# Установите Java через SDKMAN
sdk install java 11.0.19-tem
```

## 🔍 Проверка установки

После установки проверьте:

```bash
java -version
```

Должно показать что-то вроде:
```
openjdk version "11.0.x"
```

## 🚀 После установки Java

Попробуйте снова собрать APK:

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
npm run build:apk
```

## ⚠️ Также требуется Android SDK

Для сборки APK также нужен Android SDK. См. инструкции в других файлах.

## 📋 Быстрая команда (если Homebrew установлен)

```bash
# Установка Java
brew install openjdk@11

# Настройка (одна команда)
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 11)' >> ~/.zshrc && \
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc && \
source ~/.zshrc

# Проверка
java -version

# Сборка APK
cd /Users/aleksandr/zaloginvest-platform/mobile && npm run build:apk
```


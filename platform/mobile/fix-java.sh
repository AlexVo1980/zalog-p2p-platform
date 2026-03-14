#!/bin/bash

# Скрипт для настройки Java после установки через Homebrew

echo "☕ Настройка Java..."

# Определяем путь к Java
if [ -d "/opt/homebrew/opt/openjdk@11" ]; then
    JAVA_PATH="/opt/homebrew/opt/openjdk@11"
elif [ -d "/usr/local/opt/openjdk@11" ]; then
    JAVA_PATH="/usr/local/opt/openjdk@11"
else
    echo "❌ OpenJDK 11 не найден. Установите: brew install openjdk@11"
    exit 1
fi

echo "✅ Java найдена в: $JAVA_PATH"

# Находим bin директорию
JAVA_BIN="$JAVA_PATH/bin"
if [ -f "$JAVA_BIN/java" ]; then
    echo "✅ Java исполняемый файл найден"
else
    # Пробуем через libexec
    JAVA_BIN="$JAVA_PATH/libexec/openjdk.jdk/Contents/Home/bin"
    if [ ! -f "$JAVA_BIN/java" ]; then
        echo "❌ Не могу найти java исполняемый файл"
        exit 1
    fi
fi

# Находим JAVA_HOME
JAVA_HOME_PATH="$JAVA_PATH"
if [ -d "$JAVA_PATH/libexec/openjdk.jdk/Contents/Home" ]; then
    JAVA_HOME_PATH="$JAVA_PATH/libexec/openjdk.jdk/Contents/Home"
fi

echo "📝 Настройка переменных окружения..."

# Удаляем старые настройки Java из .zshrc
sed -i.bak '/JAVA_HOME/d' ~/.zshrc
sed -i.bak '/export PATH.*JAVA_HOME/d' ~/.zshrc

# Добавляем новые настройки
echo '' >> ~/.zshrc
echo '# Java JDK 11' >> ~/.zshrc
echo "export JAVA_HOME=\"$JAVA_HOME_PATH\"" >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc

echo "✅ Переменные добавлены в ~/.zshrc"

# Применяем в текущей сессии
export JAVA_HOME="$JAVA_HOME_PATH"
export PATH="$JAVA_HOME/bin:$PATH"

# Проверка
echo ""
echo "🔍 Проверка установки..."
if "$JAVA_BIN/java" -version 2>&1 | head -1; then
    echo ""
    echo "✅ Java успешно настроена!"
    echo ""
    echo "📋 Теперь можно собрать APK:"
    echo "   cd /Users/aleksandr/zaloginvest-platform/mobile"
    echo "   npm run build:apk"
else
    echo "❌ Java не работает. Попробуйте перезапустить терминал."
fi


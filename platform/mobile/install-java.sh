#!/bin/bash

# Скрипт для установки Java и настройки окружения

echo "☕ Установка Java JDK 11..."

# Проверка Homebrew
if command -v brew &> /dev/null; then
    echo "✅ Homebrew найден"
    
    # Установка OpenJDK 11
    echo "📦 Установка OpenJDK 11 через Homebrew..."
    brew install openjdk@11
    
    # Настройка переменных окружения
    echo "⚙️ Настройка переменных окружения..."
    
    # Проверка, не добавлено ли уже
    if ! grep -q "JAVA_HOME.*java_home" ~/.zshrc 2>/dev/null; then
        echo '' >> ~/.zshrc
        echo '# Java JDK 11' >> ~/.zshrc
        echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 11 2>/dev/null || echo "")' >> ~/.zshrc
        echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
        echo "✅ Переменные добавлены в ~/.zshrc"
    else
        echo "ℹ️ Переменные уже настроены"
    fi
    
    # Применить изменения
    export JAVA_HOME=$(/usr/libexec/java_home -v 11 2>/dev/null)
    export PATH=$JAVA_HOME/bin:$PATH
    
    # Проверка
    echo ""
    echo "🔍 Проверка установки..."
    if java -version 2>&1 | head -1; then
        echo "✅ Java успешно установлена и настроена!"
        echo ""
        echo "📋 Следующий шаг:"
        echo "   cd /Users/aleksandr/zaloginvest-platform/mobile"
        echo "   npm run build:apk"
    else
        echo "❌ Java не найдена. Попробуйте перезапустить терминал."
    fi
else
    echo "❌ Homebrew не найден"
    echo ""
    echo "Установите Homebrew:"
    echo '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
    echo ""
    echo "Или установите Java вручную с https://www.oracle.com/java/technologies/downloads/"
fi


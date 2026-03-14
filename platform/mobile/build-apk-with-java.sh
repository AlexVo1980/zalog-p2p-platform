#!/bin/bash

# Скрипт для сборки APK с автоматической настройкой Java

echo "☕ Настройка Java..."
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

echo "🔍 Проверка Java..."
if java -version 2>&1 | grep -q "openjdk version"; then
    echo "✅ Java настроена"
    java -version | head -1
else
    echo "❌ Java не работает"
    exit 1
fi

echo ""
echo "🔨 Запуск сборки APK..."
cd "$(dirname "$0")/android" || exit 1

./gradlew assembleDebug

if [ $? -eq 0 ]; then
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        echo ""
        echo "✅ APK успешно собран!"
        echo "📱 Файл: $(pwd)/$APK_PATH"
        echo ""
        echo "Полный путь:"
        echo "$(cd "$(dirname "$APK_PATH")" && pwd)/$(basename "$APK_PATH")"
    else
        echo "❌ APK файл не найден после сборки"
        exit 1
    fi
else
    echo "❌ Ошибка при сборке APK"
    exit 1
fi


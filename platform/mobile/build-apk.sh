#!/bin/bash

# Скрипт для сборки APK файла

echo "🔨 Начинаю сборку APK..."

# Проверка Android SDK
if [ -z "$ANDROID_HOME" ]; then
    echo "❌ Ошибка: ANDROID_HOME не установлен"
    echo "Установите Android Studio и настройте переменные окружения"
    exit 1
fi

# Переход в папку android
cd "$(dirname "$0")/android" || exit 1

# Очистка предыдущих сборок
echo "🧹 Очистка предыдущих сборок..."
./gradlew clean

# Сборка Debug APK
echo "📦 Сборка Debug APK..."
./gradlew assembleDebug

if [ $? -eq 0 ]; then
    APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        echo ""
        echo "✅ APK успешно собран!"
        echo "📱 Файл: $(pwd)/$APK_PATH"
        echo ""
        echo "Для установки на устройство:"
        echo "  adb install $APK_PATH"
        exit 0
    else
        echo "❌ APK файл не найден после сборки"
        exit 1
    fi
else
    echo "❌ Ошибка при сборке APK"
    exit 1
fi


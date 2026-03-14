#!/bin/bash

# Правильная команда для сборки APK

echo "📍 Переход в правильную директорию..."
cd /Users/aleksandr/zaloginvest-platform/mobile

echo "🔨 Запуск сборки APK..."
npm run build:apk

echo ""
echo "✅ Если сборка успешна, APK будет здесь:"
echo "   $(pwd)/android/app/build/outputs/apk/debug/app-debug.apk"


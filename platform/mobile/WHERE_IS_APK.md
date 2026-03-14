# 📍 Где находится APK файл

## 📦 Расположение APK файлов

### Debug APK (для тестирования)

После сборки APK будет находиться здесь:

```
mobile/android/app/build/outputs/apk/debug/app-debug.apk
```

**Полный путь:**
```
/Users/aleksandr/zaloginvest-platform/mobile/android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK (для публикации)

После сборки Release версии:

```
mobile/android/app/build/outputs/apk/release/app-release.apk
```

**Полный путь:**
```
/Users/aleksandr/zaloginvest-platform/mobile/android/app/build/outputs/apk/release/app-release.apk
```

## 🔍 Как проверить наличие APK

### Через терминал:

```bash
# Проверить Debug APK
ls -lh mobile/android/app/build/outputs/apk/debug/app-debug.apk

# Проверить Release APK
ls -lh mobile/android/app/build/outputs/apk/release/app-release.apk

# Или найти все APK файлы
find mobile/android/app/build/outputs/apk -name "*.apk"
```

### Через Finder (macOS):

1. Откройте Finder
2. Перейдите в папку проекта
3. Откройте: `mobile/android/app/build/outputs/apk/debug/`
4. Там будет файл `app-debug.apk`

## 🚀 Как собрать APK

### После установки Android SDK:

```bash
cd mobile
npm run build:apk
```

Или:

```bash
cd mobile/android
./gradlew assembleDebug
```

## 📱 Размер APK

- **Debug APK**: ~30-50 MB
- **Release APK**: ~15-25 MB (оптимизированная версия)

## 📂 Структура папок

```
mobile/
└── android/
    └── app/
        └── build/
            └── outputs/
                └── apk/
                    ├── debug/
                    │   └── app-debug.apk  ← Debug APK здесь
                    └── release/
                        └── app-release.apk  ← Release APK здесь
```

## ⚠️ Важно

APK файлы создаются **только после сборки**. Если вы еще не собирали APK, папка может быть пустой или не существовать.

## 🎯 Быстрая команда для проверки

```bash
# Перейти в папку с APK
cd mobile/android/app/build/outputs/apk/debug

# Проверить наличие файла
ls -lh app-debug.apk
```

## 📋 После сборки

После успешной сборки вы увидите сообщение:

```
BUILD SUCCESSFUL

APK location: mobile/android/app/build/outputs/apk/debug/app-debug.apk
```


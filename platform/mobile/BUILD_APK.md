# Инструкция по сборке APK

## 🎯 Быстрая сборка

### Вариант 1: Использовать скрипт

```bash
cd mobile
./build-apk.sh
```

### Вариант 2: Через Gradle напрямую

```bash
cd mobile/android
./gradlew assembleDebug
```

APK будет в: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`

## ⚠️ Требования

Для сборки APK необходимо:

1. **Android SDK установлен**
   ```bash
   # Установите Android Studio
   brew install --cask android-studio
   ```

2. **Переменные окружения настроены**
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

3. **Java JDK установлен** (версия 11 или выше)
   ```bash
   # Проверка
   java -version
   ```

## 📦 Сборка Debug APK

Debug APK используется для тестирования и не требует подписи.

```bash
cd mobile/android
./gradlew assembleDebug
```

Результат: `app/build/outputs/apk/debug/app-debug.apk`

## 🔐 Сборка Release APK

### 1. Создайте keystore (один раз)

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore \
  -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Сохраните пароли!

### 2. Настройте gradle.properties

Добавьте в `mobile/android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=ваш_пароль
MYAPP_RELEASE_KEY_PASSWORD=ваш_пароль
```

### 3. Обновите build.gradle

Убедитесь, что в `mobile/android/app/build.gradle` есть:

```gradle
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
}
```

### 4. Соберите Release APK

```bash
cd mobile/android
./gradlew assembleRelease
```

Результат: `app/build/outputs/apk/release/app-release.apk`

## 📱 Установка APK на устройство

### Через ADB

```bash
# Подключите устройство через USB
adb devices

# Установите APK
adb install app-debug.apk
```

### Вручную

1. Передайте APK файл на устройство
2. Откройте файл на устройстве
3. Разрешите установку из неизвестных источников (если требуется)
4. Установите приложение

## 🔧 Решение проблем

### Ошибка "ANDROID_HOME not set"

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Ошибка "SDK location not found"

Убедитесь, что Android SDK установлен:
- Откройте Android Studio
- Tools → SDK Manager
- Установите Android SDK Platform 33

### Ошибка "Gradle build failed"

```bash
cd mobile/android
./gradlew clean
./gradlew assembleDebug
```

### Ошибка "Java version"

Установите JDK 11 или выше:
```bash
brew install openjdk@11
```

## 📊 Размер APK

- Debug APK: ~30-50 MB
- Release APK: ~15-25 MB (после оптимизации)

## 🎯 Готово!

После сборки APK можно:
- Установить на устройство
- Распространять среди тестировщиков
- Загрузить в Google Play (Release версия)


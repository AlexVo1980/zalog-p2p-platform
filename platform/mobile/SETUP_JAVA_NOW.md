# ✅ Быстрая настройка Java

## Проблема

Java установлена через Homebrew, но система её не видит.

## Решение

Выполните эти команды **БЕЗ комментариев** (уберите символы #):

```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
java -version
```

Если это работает, добавьте в `~/.zshrc`:

```bash
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

## Или используйте скрипт

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
./fix-java.sh
```

## После настройки

```bash
cd /Users/aleksandr/zaloginvest-platform/mobile
npm run build:apk
```


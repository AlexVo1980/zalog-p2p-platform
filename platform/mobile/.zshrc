# Homebrew (если ещё нет выше в файле)
eval "$(/opt/homebrew/bin/brew shellenv)"

# Android SDK
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
export PATH="$PATH:$ANDROID_HOME/tools"
export PATH="$PATH:$ANDROID_HOME/tools/bin"

# JDK — используем только одну версию (рекомендуем 17, но пока оставим 11 как у тебя)
# Если хочешь перейти на 17 — закомментируй 11 и раскомментируй Zulu 17 ниже
export JAVA_HOME=/opt/homebrew/opt/openjdk@11/libexec/openjdk.jdk/Contents/Home
export PATH="$JAVA_HOME/bin:$PATH"

# Альтернатива: Zulu 17 (рекомендуется для новых RN проектов на M-чипе)
# brew install --cask zulu@17
# export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
# export PATH="$JAVA_HOME/bin:$PATH"

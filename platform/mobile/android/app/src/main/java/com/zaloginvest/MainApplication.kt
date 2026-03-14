package com.zaloginvest

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost
import com.facebook.react.PackageList
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  private val mReactNativeHost = object : ReactNativeHost(this) {
    override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

    override fun getPackages(): List<ReactPackage> {
      val packages = PackageList(this).packages.toMutableList()
      // Добавь кастомные пакеты здесь, если есть
      return packages
    }

    override fun getJSMainModuleName(): String = "index"
  }

  override val reactNativeHost: ReactNativeHost
    get() = mReactNativeHost

  override val reactHost: ReactHost
    get() = DefaultReactHost.getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}

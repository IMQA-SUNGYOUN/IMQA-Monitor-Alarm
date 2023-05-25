package com.onycom.alarm;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import androidx.annotation.NonNull;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import io.imqa.rn.module.RNMpmPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.onycom.alarm.newarchitecture.MainApplicationReactNativeHost;

import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
    this,
    new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new AppPackage()); // 패키지 추가
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  });

  private final ReactNativeHost mNewArchitectureNativeHost =
      new ReactNativeHostWrapper(this, new MainApplicationReactNativeHost(this));

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();

    SharedPreferences pref = getSharedPreferences("IMQA_SampleConfig", MODE_PRIVATE);
    String serverUrl = pref.getString("serverUrl","http://collector.imqa.io");
    String crashServerUrl = pref.getString("crashServerUrl","http://collector.imqa.io");
    String projectKey = pref.getString("projectKey","<프로젝트 키를 넣어주세요>");

    //    imqa
    io.imqa.core.IMQAOption imqaOption = new io.imqa.core.IMQAOption();
    imqaOption.setUploadPeriod(true);
    imqaOption.setKeepFileAtUploadFail(false);
    imqaOption.setHttpTracing(true);
    imqaOption.setPrintLog(true);
    imqaOption.setBehaviorTracing(true);
    imqaOption.setEventTracing(true);

    if(serverUrl != null) {
      imqaOption.setServerUrl(serverUrl);
    }

    if(crashServerUrl != null) {
      imqaOption.setCrashServerUrl(serverUrl);
    }

    io.imqa.mpm.IMQAMpmAgent.getInstance()
            .setOption(imqaOption) // MPM 의 동작 방식을 정하는 옵션을 설정합니다.
            .setContext(this, "") // Application Context 를 초기화 합니다.
            .setProjectKey(projectKey) // IMQA MPM Client 의 Project Key 를 설정합니다.
            .init();

    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);

    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onConfigurationChanged(@NonNull Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.onycom.alarm.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

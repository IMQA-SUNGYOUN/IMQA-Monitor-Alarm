package com.onycom.alarm;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.logging.Logger;

public class ImqaWrappingClass extends ReactContextBaseJavaModule {

    ImqaWrappingClass(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ImqaWrappingClass";
    }

    @ReactMethod
    public void setAgentConfig(String serverUrl, String projectKey){
        Log.d("setAgentConfig", "serverURL : " + serverUrl + " / " + "projectKey : " + projectKey);
        SharedPreferences pref = getReactApplicationContext().getSharedPreferences("IMQA_SampleConfig", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString("serverUrl", serverUrl);
        editor.putString("crashServerUrl", serverUrl);
        editor.putString("projectKey", projectKey);
        editor.apply();

        Toast.makeText(getReactApplicationContext(), "재시작 후 반영됩니다", Toast.LENGTH_SHORT).show();
    }

}

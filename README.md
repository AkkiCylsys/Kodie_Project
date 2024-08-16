# Kodie_Project

must be same for android
    "react-native-reanimated": "~2.2.0",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",

    #Map Issue in Android
    
I resolved an issue using the following setup:

Note:If you are using react-native-reanimated, first check out this link:
software-mansion/react-native-reanimated#6076 (comment)

React Native version: 0.72.3
react-native-maps version: 1.15.6

The solution involves replacing the MapUIBlock.java file located at node_modules/react-native-maps/android/src/main/java/com/rnmaps/maps/MapUIBlock.java

Here's the code to use in MapUIBlock.java:

package com.rnmaps.maps;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.UIManagerModule;

import java.util.function.Function;

public class MapUIBlock implements UIBlock {
    private int tag;
    private Promise promise;
    private ReactApplicationContext context;
    private Function<MapView, Void> mapOperation;

    public MapUIBlock(int tag, Promise promise, ReactApplicationContext context, Function<MapView, Void> mapOperation) {
        this.tag = tag;
        this.promise = promise;
        this.context = context;
        this.mapOperation = mapOperation;
    }

    @Override
    public void execute(NativeViewHierarchyManager nvhm) {
        MapView view = (MapView) nvhm.resolveView(tag);
        if (view == null) {
            promise.reject("AirMapView not found");
            return;
        }
        if (view.map == null) {
            promise.reject("AirMapView.map is not valid");
            return;
        }

        mapOperation.apply(view);
    }

    public void addToUIManager() {
        UIManagerModule uiManager = context.getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(this);
    }
}


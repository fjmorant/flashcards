package com.flashcards;

import com.reactnativenavigation.activities.RootActivity;

public class MainActivity extends RootActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "FlashCards";
    }
}

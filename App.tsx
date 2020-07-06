import React, { useState } from "react";
import { Provider } from "mobx-react"
import "mobx-react-lite/batchingForReactDom";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import MainLayout from "./src/MainLayout";
import rootStore from "./src/store";
import Fonts from "./assets/fonts";

async function loadApplication() {
    await Font.loadAsync({
        [Fonts.ROBOTO_REGULAR]: require("./assets/fonts/Roboto-Regular.ttf"),
        [Fonts.ROBOTO_BOLD]: require("./assets/fonts/Roboto-Bold.ttf")
    });
}

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if(!isReady) {
        return <AppLoading
            startAsync={ loadApplication }
            onError={ error => console.log(error) }
            onFinish={ () => setIsReady(true) }
        />
    }

    return (
        <Provider rootStore={ rootStore } >
            <MainLayout />
        </Provider>
    );
};




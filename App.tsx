import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import MainLayout from "./src/MainLayout";
import { TodoState, ScreenState } from "./src/store";
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
        <ScreenState>
            <TodoState>
                <MainLayout/>
            </TodoState>
        </ScreenState>
    );
};




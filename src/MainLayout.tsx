import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { NavBar } from "./components";
import { Indentations } from "../assets/styles";
import { ScreenContext } from "./store/screen/screenContext";
import { MainScreen, TodoScreen } from "./screens";

const MainLayout = () => {
    const { todoId } = useContext(ScreenContext);

    return (
        <View >
            <NavBar />
            <View style={ styles.container } >
                { todoId
                    ? <TodoScreen />
                    : <MainScreen />
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Indentations.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
});

export default MainLayout;
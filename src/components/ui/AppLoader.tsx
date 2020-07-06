import React, { FC } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import { Colors } from "../../../assets/styles";

const AppLoader: FC = () => (
    <View style={ styles.center } >
        <ActivityIndicator size={70} color={ Colors.MAIN_COLOR } />
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AppLoader;

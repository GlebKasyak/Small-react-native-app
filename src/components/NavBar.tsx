import React, { FC } from "react";
import { View, StyleSheet, Platform } from "react-native";

import AppTextBold from "./ui/AppTextBold";
import { Style } from "../interfaces/common";
import { Colors } from "../../assets/styles";

const NavBar: FC = () =>  (
    <View
        style={{
            ...styles.navBar,
            ...Platform.select<Style>(
                {
                    ios: styles.navbarIos,
                    android: styles.navbarAndroid
                })
        }}
    >
        <AppTextBold style={ styles.text }  >
            Todo
        </AppTextBold>
    </View>
);

const styles = StyleSheet.create({
    navBar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10
    },
    navbarAndroid: {
        backgroundColor: Colors.MAIN_COLOR,
    },
    navbarIos: {
        borderBottomColor: Colors.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS === "ios" ? Colors.MAIN_COLOR : Colors.WHITE,
        fontSize: 20
    }
});

export default NavBar;

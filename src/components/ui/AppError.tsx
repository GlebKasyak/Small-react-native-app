import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import AppTextBold from "./AppTextBold";
import AppButton from "./AppButton";
import { Colors } from "../../../assets/styles";

type Props = {
    error: string
    onFetch: () => Promise<void>
};

const AppError: FC<Props> = ({ error, onFetch }) => (
    <View style={ styles.center } >
        <AppTextBold style={ styles.error } >{ error }</AppTextBold>
        <AppButton onPress={ onFetch } color={ Colors.GREY } >
            Повторить
        </AppButton>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: Colors.RED,
        fontSize: 20,
        textAlign: "center"
    }
});

export default AppError;

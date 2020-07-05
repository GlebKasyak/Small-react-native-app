import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "../../../assets/styles";
import { Style } from "../../interfaces/common";

type Props = {
    style: Style
};

const AppCard: FC<Props> = ({ children, style }) => (
    <View style={{ ...styles.default, ...style }} >
        { children }
    </View>
);

const styles = StyleSheet.create({
    default: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: Colors.BLACK,
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        elevation: 8
    }
});

export default AppCard;
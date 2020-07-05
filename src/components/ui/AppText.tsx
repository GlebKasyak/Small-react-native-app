import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

import Fonts from "../../../assets/fonts";
import { Style } from "../../interfaces/common";

type Props = {
    style?: Style
};

const AppText: FC<Props> = ({ children, style }) => (
    <Text style={{ ...styles.default, ...style }} >{ children }</Text>
);

const styles = StyleSheet.create({
    default: {
        fontFamily: Fonts.ROBOTO_REGULAR
    }
});

export default AppText;
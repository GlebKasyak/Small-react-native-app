import React, { FC, ComponentType } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    TouchableNativeFeedbackProps,
    TouchableOpacityProps
} from "react-native";

import AppTextBold from "./AppTextBold";
import { Colors } from "../../../assets/styles";

type Props = {
    onPress: () => void,
    color?: string
};

type WrapperType = ComponentType<TouchableNativeFeedbackProps | TouchableOpacityProps>;

const AppButton: FC<Props> = ({ children, onPress, color = Colors.MAIN_COLOR }) => {
    const Wrapper: WrapperType = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

    return (
        <Wrapper onPress={ onPress } activeOpacity={0.7} >
            <View style={{ ...styles.button, backgroundColor: color }} >
                <AppTextBold style={ styles.text } >
                    { children }
                </AppTextBold>
            </View>
        </Wrapper>
    )
};

const styles = StyleSheet.create({
   button: {
       paddingHorizontal: 20,
       paddingVertical: 10,
       borderRadius: 5,
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "center"
   },
    text: {
       color: Colors.WHITE
    }
});

export default AppButton;
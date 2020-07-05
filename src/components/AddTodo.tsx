import React, { FC, useState } from "react";
import { View, TextInput, StyleSheet, Keyboard, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Colors } from "../../assets/styles";

type Props = {
    onSubmit: (title: string) => void
};

const AddTodo: FC<Props> = ({ onSubmit }) => {
    const [value, setValue] = useState("");

    const handlePress = () => {
        if(value.trim()) {
            onSubmit(value);
            setValue("");
            Keyboard.dismiss();
        } else {
            Alert.alert("Название дела не может быть пустым!")
        }
    };

    return (
        <View style={ styles.block } >
            <TextInput
                style={ styles.input }
                value={ value }
                placeholder="Введите название дела"
                onChangeText={ setValue }
                keyboardType="visible-password"
                autoCapitalize="none"
            />
            <AntDesign.Button onPress={ handlePress } name="pluscircleo" >
                Add
            </AntDesign.Button>
        </View>
    )
};

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    input: {
        width: "60%",
        borderStyle: "solid",
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.MAIN_COLOR
    }
});

export default AddTodo;
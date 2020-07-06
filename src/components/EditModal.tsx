import React, { FC, useState } from "react";
import { observer } from "mobx-react";
import { View, TextInput, Modal, StyleSheet, Alert } from "react-native";

import AppButton from "./ui/AppButton";
import { Colors } from "../../assets/styles";

type Props = {
    value: string,
    visible: boolean,
    onCancel: () => void,
    onSave: (title: string) => void
};


const EditModal: FC<Props> = ({ value, visible, onCancel, onSave }) => {
    const [newValue, setNewValue] = useState(value);

    const saveHandler = () => {
        if(newValue.trim().length < 3) {
            Alert.alert("Ошибка",`Минимальная длинна 3 символа, сейчас ${ newValue.trim().length }`);
            return value;
        } else {
            onSave(newValue);
        }
    };

    const cancelHandler = () => {
        setNewValue(value);
        onCancel();
    };

    return (
        <Modal visible={ visible } animationType="slide" transparent={false} >
            <View style={ styles.wrapper } >
                <TextInput
                    value={ newValue }
                    onChangeText={ setNewValue }
                    style={ styles.input }
                    placeholder="Введите название.."
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={ styles.buttons } >
                    <AppButton onPress={ cancelHandler } color={ Colors.RED } >
                        Отменить
                    </AppButton>
                    <AppButton onPress={ saveHandler }>
                        Сохранить
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: Colors.MAIN_COLOR,
        borderBottomWidth: 2,
        width: "80%"
    },
    buttons: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        justifyContent: "space-around"
    }
});

export default observer(EditModal);

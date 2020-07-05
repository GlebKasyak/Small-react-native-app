import React, { FC, useState, useContext } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions } from "react-native";

import { AppCard, EditModal, AppTextBold, AppButton } from "../components";
import { Colors } from "../../assets/styles";
import { Todo } from "../interfaces/todo";
import { ScreenContext } from "../store/screen/screenContext";
import { TodoContext } from "../store/todo/todoContext";

const TodoScreen: FC = () => {
    const { changeScreen, todoId } = useContext(ScreenContext);
    const { removeTodo, updateTodo, todos } = useContext(TodoContext);

    const [modal, setModal] = useState(false);

    const todo = todos.find(todo => todo.id === todoId) as Todo;

    const saveHandler = (title: string) => {
        updateTodo(title, todo.id);
        setModal(false);
    };

    const onRemove = () => {
        changeScreen(null);
        removeTodo(todo);
    };

    return (
        <View>
            <EditModal
                value={ todo.title }
                visible={ modal }
                onSave={ saveHandler }
                onCancel={ () => setModal(false) }
            />
            <AppCard style={ styles.card } >
                <AppTextBold style={ styles.title } >{ todo.title }</AppTextBold>
                <AppButton onPress={ () => setModal(true) } >
                    <FontAwesome name="edit" size={20} />
                </AppButton>
            </AppCard>

            <View style={ styles.buttons } >
                <View style={ styles.button } >
                    <AppButton color={ Colors.GREY } onPress={ changeScreen.bind(null, null) } >
                        <AntDesign name="back" size={20} color={ Colors.WHITE } />
                    </AppButton>
                </View>
                <View style={ styles.button } >
                    <AppButton color={ Colors.RED } onPress={ onRemove } >
                        <FontAwesome name="remove" size={20} color={ Colors.WHITE } />
                    </AppButton>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: Dimensions.get("window").width / 3
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    title: {
        fontSize: 20
    }
});

export default TodoScreen;
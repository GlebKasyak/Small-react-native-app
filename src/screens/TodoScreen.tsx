import React, { FC, useState } from "react";
import { observer, inject } from "mobx-react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { View, StyleSheet, Dimensions } from "react-native";

import { AppCard, EditModal, AppTextBold, AppButton } from "../components";
import { Colors } from "../../assets/styles";
import { Todo, TodoStoreType } from "../interfaces/todo";

import { ScreeStoreType } from "../interfaces/screen";
import { StoreType } from "../store";

type Props = {
    screenStore: ScreeStoreType,
    todoStore: TodoStoreType
};

const TodoScreen: FC<Props> = ({ screenStore, todoStore }) => {
    const [modal, setModal] = useState(false);
    const todo = todoStore.todos.find(todo => todo.id === screenStore.todoId) as Todo

    const saveHandler = (title: string) => {
        todoStore.updateTodo(title, todo.id)
        setModal(false);
    };

    const onRemove = () => {
        todoStore.removeTodo(todo);
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
                    <AppButton
                        color={ Colors.GREY }
                        onPress={ screenStore.changeScreen.bind(null, null) }
                    >
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
}
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

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    screenStore: rootStore.screenStore,
    todoStore: rootStore.todoStore
}))(observer(TodoScreen) as unknown as FC<{}>);

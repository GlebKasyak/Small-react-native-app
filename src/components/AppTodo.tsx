import React, { FC } from "react";
import { observer } from "mobx-react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./ui/AppText";
import { Todo } from "../interfaces/todo";

type Props = {
    todo: Todo,
    onDelete: (todo: Todo) => void,
    onOpen: (id: string | null) => void
};

const AppTodo: FC<Props> = observer(({ todo, onDelete, onOpen }) => (
    <TouchableOpacity
        activeOpacity={0.5}
        onPress={ () => onOpen(todo.id) }
        onLongPress={ onDelete.bind(null, todo) }
    >
        <View style={ styles.todo } >
            <AppText >{ todo.title }</AppText>
        </View>
    </TouchableOpacity>
));

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5
    }
});

export default AppTodo;

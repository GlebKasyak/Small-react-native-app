import React, { FC, useReducer, useContext } from "react";
import { Alert } from "react-native";

import { TodoContext } from "./todoContext";
import { ScreenContext } from "../screen/screenContext";
import todoReducer from "./todoReducer";
import * as Types from "../types/todo";
import { Todo } from "../../interfaces/todo";


const TodoState: FC = ({ children }) => {
    const initialState = {
        todos: []
    };
    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = (title: string) => {
        dispatch({ type: Types.ADD_TODO, payload: title })
    };

    const removeTodo = (todo: Todo) => {
        Alert.alert(
            'Удаление элемента',
            `Вы уверены что хотите удалить ${ todo.title }`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    onPress: () => {
                        changeScreen(null);
                        dispatch({ type: Types.REMOVE_TODO, payload: todo.id })
                    }
                }
            ],
            { cancelable: false },
        );
    };

    const updateTodo = (title: string, id: string) => {
        dispatch({ type: Types.UPDATE_TODO, payload: { title, id } })
    };

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            addTodo,
            removeTodo,
            updateTodo
        }}>
            { children }
        </TodoContext.Provider>
    )
};

export default TodoState;


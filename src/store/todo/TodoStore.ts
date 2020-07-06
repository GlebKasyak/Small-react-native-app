import { observable, decorate, action } from "mobx";
import { Alert } from "react-native";

import { RootStoreType } from "../index";
import { Todo } from "../../interfaces/todo";

class TodoStore {
    rootStore: RootStoreType;
    todos: Array<Todo> = [];

    constructor(rootStore: RootStoreType) {
        this.rootStore = rootStore;
    };

    addTodo = (title: string) => {
        this.todos.push({
            id: Date.now().toString(),
            title
        });
    };

    removeTodo = (currentTodo: Todo) => {
        Alert.alert(
            'Удаление элемента',
            `Вы уверены что хотите удалить ${ currentTodo.title }`,
            [
                {
                    text: "Отмена",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    onPress: () => {
                        this.rootStore.screenStore.changeScreen(null);
                        this.todos = this.todos.filter(todo => todo.id !== currentTodo.id);
                    }
                }
            ],
            { cancelable: false },
        );
    };

    updateTodo = (title: string, id: string) => {
        this.todos = this.todos.map(todo => {
            if(todo.id === id) {
                return { ...todo, title };
            }

            return todo;
        });
    };
};

decorate(TodoStore, {
    todos: observable,
    addTodo: action,
    removeTodo: action,
    updateTodo: action,
})

export default TodoStore;

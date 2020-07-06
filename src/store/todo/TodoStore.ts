import { observable, decorate, action, runInAction } from "mobx";
import { Alert } from "react-native";

import { RootStoreType } from "../index";
import { TodoAPI } from "../../apiServices";
import { Todo } from "../../interfaces/todo";

class TodoStore {
    rootStore: RootStoreType;
    todos: Array<Todo> = [];
    loading = false;
    error = null as null | string;

    constructor(rootStore: RootStoreType) {
        this.rootStore = rootStore;
    };

    fetchTodos = async () => {
        this.loading = true;
        this.error = null;

        try {
            const todos = await TodoAPI.getTodos();

            runInAction(() => {
                this.todos = todos;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    addTodo = async (title: string) => {
        const { name } = await TodoAPI.addTodo(title);

        this.todos.push({ id: name, title });
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
                    onPress: async () => {
                        this.rootStore.screenStore.changeScreen(null);
                        await TodoAPI.removeTodo(currentTodo.id)
                        this.todos = this.todos.filter(todo => todo.id !== currentTodo.id);
                    }
                }
            ],
            { cancelable: false },
        );
    };

    updateTodo = async (title: string, id: string) => {
        this.error = null;

        try {
            await TodoAPI.updateTodo(id, title);

            this.todos = this.todos.map(todo => {
                if(todo.id === id) {
                    return { ...todo, title };
                }

                return todo;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        }
    };
};

decorate(TodoStore, {
    todos: observable,
    loading: observable,
    error: observable,

    fetchTodos: action,
    addTodo: action,
    removeTodo: action,
    updateTodo: action,
})

export default TodoStore;

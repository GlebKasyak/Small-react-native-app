import { createContext } from "react";

import { Todo } from "../../interfaces/todo";

const initialState = {
    todos: [] as Array<Todo>,
    addTodo: (title: string) => {},
    removeTodo: (todo: Todo) => {},
    updateTodo: (title: string, id: string) => {},
};

export type TodoContextType = typeof initialState;

export const TodoContext = createContext<TodoContextType>(initialState);


import * as Types from "../types/todo";
import { Todo } from "../../interfaces/todo";
import { Action } from "../../interfaces/common";

type State = {
    todos: Array<Todo>
};

type Actions =
    | Action<typeof Types.ADD_TODO, string>
    | Action<typeof Types.UPDATE_TODO, Todo>
    | Action<typeof Types.REMOVE_TODO, string>;

export default (state: State, action: Actions): State => {
    switch (action.type) {
        case Types.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, {
                    id: Date.now().toString(),
                    title: action.payload
                }]
            };
        case Types.UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo.id === action.payload.id) {
                        return { ...todo, title: action.payload.title };
                    }

                    return todo;
                })
            };
        case Types.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        default:
            return state
    };
};
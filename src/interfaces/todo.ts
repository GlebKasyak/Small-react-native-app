
export type Todo = {
    id: string,
    title: string
};

export type TodoStoreType = {
    todos: Array<Todo>

    addTodo(title: string): void,
    removeTodo(todo: Todo): void,
    updateTodo(title: string, id: string): void
}

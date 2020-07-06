
export type Todo = {
    id: string,
    title: string
};

export type TodoStoreType = {
    todos: Array<Todo>,
    loading: boolean,
    error: null | string

    fetchTodos(): Promise<void>,
    addTodo(title: string): Promise<void>,
    removeTodo(todo: Todo): Promise<void>,
    updateTodo(title: string, id: string): Promise<void>
}

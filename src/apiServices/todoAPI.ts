import { DB_URL, HEADERS, FETCH_METHODS } from "../shared/constants";

class TodoAPI {
    static getTodos = async () => {
        const response = await request(`${ DB_URL }.json`);
        const data = await response.json();
        return Object.keys(data).map(key => ({ ...data[key], id: key }));
    };

    static addTodo = async (title: string) => {
        const response = await request(`${ DB_URL }.json`, "POST", { title });
        return await response.json();
    };

    static removeTodo = async (todoId: string) => {
       await request(`${ DB_URL }/${ todoId }.json`, "DELETE");
    };

    static updateTodo = async (todoId: string, title: string) => {
        await request(`${ DB_URL }/${ todoId }.json`, "PATCH", { title });
    };
};

function request(url: string, method: FETCH_METHODS = "GET", data?: any) {
    type Config = {
        method: FETCH_METHODS,
        headers: typeof HEADERS,
        body?: string
    };

    const config: Config = {
        method,
        headers: HEADERS,
    };

    if(method === "POST" || method === "PATCH") {
        config.body = JSON.stringify(data)
    };

    return fetch(url, config);
}

export default TodoAPI;

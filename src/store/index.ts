import ScreenStore from "./screen/ScreenStore";
import TodoStore from "./todo/TodoStore";
import { ScreeStoreType } from "../interfaces/screen";
import { TodoStoreType } from "../interfaces/todo";

class RootStore {
    screenStore: ScreeStoreType;
    todoStore: TodoStoreType;
    constructor() {
        this.screenStore = new ScreenStore();
        this.todoStore = new TodoStore(this);
    }
};

export type RootStoreType = {
    screenStore: ScreeStoreType
    todoStore: TodoStoreType
};

export type StoreType = {
   rootStore: RootStoreType
};

export default new RootStore();

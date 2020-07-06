import { observable, decorate, action } from "mobx";

class ScreenStore {
    todoId: null | string = null;

    changeScreen = (id: string | null) => {
        this.todoId = id
    };
};

decorate(ScreenStore, {
    todoId: observable,
    changeScreen: action
})

export default ScreenStore;

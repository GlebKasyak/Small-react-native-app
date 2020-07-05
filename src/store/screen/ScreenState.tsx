import React, { FC, useReducer } from "react";

import { ScreenContext } from "./screenContext";
import screenReducer from "./screenReducer";
import * as Types from "../types/screen";

const ScreenState: FC = ({ children }) => {
    const [state, dispatch] = useReducer(screenReducer, null);

    const changeScreen = (id: string | null) => dispatch({ type: Types.CHANGE_SCREEN, payload: id });

    return (
        <ScreenContext.Provider value={{
            changeScreen,
            todoId: state!.todoId
        }}>
            { children }
        </ScreenContext.Provider>
    )
};

export default ScreenState;


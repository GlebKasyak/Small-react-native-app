import { createContext } from "react";

const initialValue = {
    changeScreen: (id: string | null) => {},
    todoId: "" as string | null
};

export type ScreenContextType = typeof initialValue;

export const ScreenContext = createContext<ScreenContextType>(initialValue);


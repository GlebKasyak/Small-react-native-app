import * as Types from "../types/screen";
import { Action } from "../../interfaces/common";

type State = { todoId: string | null } | null;

type Actions =
   | Action<typeof Types.CHANGE_SCREEN, string | null>


export default (state: State, action: Actions): State => {
   switch (action.type) {
      case Types.CHANGE_SCREEN:
         return {
            todoId: action.payload
         };
      default:
         return state;
   }
};
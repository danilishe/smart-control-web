import { combineReducers } from "redux";
import { programReducer } from "./programReducer";
import { effectsReducer } from "./effectsReducer";

export interface Action<Type> {
    type : Type,
    data: any
}

export const rootReducer = combineReducers({
    programReducer, effectsReducer
});

export type RootState = ReturnType<typeof rootReducer>
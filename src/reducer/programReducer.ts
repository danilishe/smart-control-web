import { Effect, fadeIn } from "../model/Effect";
import { Action } from "./rootReducer";

const INITIAL_STATE : ProgramState = {
    effects: [
        fadeIn,
        fadeIn,
        fadeIn,
        fadeIn,
        fadeIn,
        fadeIn,
        fadeIn,
        fadeIn,
    ]
}

export interface ProgramState {
    effects: Effect[]
}

export const enum ProgramActionType {
    ADD_EFFECT,
    REMOVE_EFFECT,
    UPDATE_EFFECT,
}

export const programReducer = (state: ProgramState = INITIAL_STATE, action : Action<ProgramActionType>) : ProgramState => {
    switch (action) {
        default:
            return state;
    }
}
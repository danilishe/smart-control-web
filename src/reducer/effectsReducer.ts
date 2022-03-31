import { Effect, fadeIn } from "../model/Effect";
import { Action } from "./rootReducer";

export const enum EffectActionType {
    ADD_EFFECT,
    REMOVE_EFFECT,
    UPDATE_EFFECT,
}

const INITIAL_STATE = {
    effects: [
        fadeIn
    ]
}

export interface EffectsState {
    effects: Effect[]
}

export const effectsReducer = (state: EffectsState = INITIAL_STATE, action : Action<EffectActionType>) => {
    switch (action.type) {
        default:
            return state;
    }
}
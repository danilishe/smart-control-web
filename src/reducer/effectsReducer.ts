import { Effect, fadeIn, solidColor } from "../model/Effect";
import { PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    effects: [
        fadeIn, solidColor
    ]
}

export interface EffectsState {
    effects: Effect[]
}

export const effectsReducer = (state: EffectsState = INITIAL_STATE, action: PayloadAction<Effect>) => {
    switch (action.type) {
        default:
            return state;
    }
}
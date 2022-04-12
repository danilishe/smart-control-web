import { Effect, smoothChange, sharpChange, solidColor, ALL_EFFECTS } from "../model/Effect";
import { PayloadAction } from "@reduxjs/toolkit";

const INITIAL_STATE: EffectsState = {
    effects: [ ...ALL_EFFECTS ]
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
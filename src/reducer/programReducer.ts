import { Effect } from "../model/Effect";
import { createAction, PayloadAction } from "@reduxjs/toolkit";


export const effectAdd = createAction<Effect>("effect/add")
export const effectRemove = createAction<Effect>("effect/remove")
export const effectUpdate = createAction<Effect>("effect/update")

const INITIAL_STATE: ProgramState = {
    effects: [],
}

export interface ProgramState {
    effects: Effect[]
}
function generateUniqueID() {
    return `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`;
}

export const programReducer = (state: ProgramState = INITIAL_STATE, action: PayloadAction<Effect>): ProgramState => {
    switch (action.type) {
        case effectRemove.type:
            return { ...state, effects: state.effects.filter(effect => effect.id !== action.payload.id) };
        case effectAdd.type:
            const index = state.effects.indexOf(action.payload);
            const newEffect = { ...action.payload, id: generateUniqueID() };
            let newEffects: Effect[];
            if (index >= 0) {
                newEffects = [
                    ...state.effects.slice(0, index),
                    newEffect,
                    ...state.effects.slice(index)
                ];
            } else {
                newEffects = [...state.effects, newEffect];
            }
            return { ...state, effects: newEffects };
        case effectUpdate.type:
            return {
                ...state, effects: state.effects.map(e => e.id === action.payload.id ? action.payload : e)
            }
        default:
            return state;
    }
}
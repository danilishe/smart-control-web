import { Effect, fadeIn } from "../model/Effect";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";


export const effectAdd = createAction<Effect>("effect/add")
export const effectRemove = createAction<Effect>("effect/remove")
export const effectUpdate = createAction<Effect>("effect/update")

const INITIAL_STATE: ProgramState = {
    effects: []
}

export interface ProgramState {
    effects: Effect[]
}

export const programReducer = (state: ProgramState = INITIAL_STATE, action: PayloadAction<Effect>): ProgramState => {
    switch (action.type) {
        case effectRemove.type:
            return { ...state, effects: state.effects.filter(effect => effect.id !== action.payload.id) };
        case effectAdd.type:
            return {
                ...state,
                effects: [
                    ...state.effects,
                    { ...action.payload, id: generateUniqueID() }
                ]
            };
        default:
            return state;
    }
}
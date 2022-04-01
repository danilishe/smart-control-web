import { createAction } from '@reduxjs/toolkit'
import { Effect } from "../model/Effect";

export const effectAdd = createAction<Effect>("effect/add")
export const effectRemove = createAction<Effect>("effect/remove")
export const effectUpdate = createAction<Effect>("effect/update")
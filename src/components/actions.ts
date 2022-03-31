import { createAction } from '@reduxjs/toolkit'
import { Effect } from "../model/Effect";

export const effectAdd = createAction<Effect>("effect/add")
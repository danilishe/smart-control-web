import React from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd, effectRemove } from "../reducer/programReducer";
import { ProgramItemCard } from "./ProgramItemCard";

export const ProgramList = () => {
    const dispatch = useDispatch();
    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <div className="collection">
            {effectsList.map((effect: Effect, index) => {
                return (
                    <div key={effect.id} className="collection-item m-2">
                        <ProgramItemCard
                            effect={effect}
                            index={index}
                            onClose={() => dispatch(effectRemove(effect))}
                            onCopy={() => dispatch(effectAdd(effect))} />
                    </div>
                )
            })}
        </div>
    )
}
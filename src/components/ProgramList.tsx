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
            {effectsList.map((i: Effect, index) => {
                return (
                    <li key={i.id} className="collection-item m-2">
                        <ProgramItemCard effect={i}
                            index={index}
                            onClose={() => dispatch(effectRemove(i))}
                            onCopy={() => dispatch(effectAdd(i))} />
                            <p>{i.id}</p>
                    </li>
                )
            })}
        </div>
    )
}
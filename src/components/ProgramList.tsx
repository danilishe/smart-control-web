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
        <ul className="collection" style={{ maxHeight: 800, overflowY: "auto" }}>
            {effectsList.map((i: Effect, index) => {
                return (
                    <div key={i.id} className="collection-item m-2">
                        <div className="d-flex align-items-start">
                            <ProgramItemCard effect={i}
                                            index={index}
                                            onClose={() => dispatch(effectRemove(i))}
                                            onCopy={() => dispatch(effectAdd(i))}/>
                        </div>

                    </div>)
            })}
        </ul>
    )
}
import React, { MouseEventHandler } from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectRemove } from "../reducer/programReducer";

export const ProgramList = () => {
    const dispatch = useDispatch();
    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <ul className="collection" style={{ maxHeight: 800, overflowY: "auto" }}>
            {effectsList.map((i: Effect, index) => {
                return (
                    <div key={i.id} className="collection-item m-2">
                        # {index + 1}
                        <ProgramItem effect={i} onClose={() => dispatch(effectRemove(i))}/>
                    </div>)
            })}
        </ul>
    )
}

interface ProgramItemProps {
    effect: Effect;
    onClose: MouseEventHandler<HTMLButtonElement>;
}

export const ProgramItem = ({ effect, onClose }: ProgramItemProps) => {
    return (<div className="card">

        <h5 className="card-title m-2">
            <span> <i className="bi-three-dots-vertical"/></span>
            {effect.label}
            <button type="button" onClick={onClose} className="btn-close float-end btn-sm" aria-label="Close"/>
        </h5>
        <div className="card-body">
            <div className="input-group mb-3 input-group-sm">
                <span className="input-group-text">Длина</span>
                <input type="text" className="form-control" disabled={true} value={effect.length()}/>
                <span className="input-group-text">сек.</span>
            </div>
        </div>
    </div>);
}
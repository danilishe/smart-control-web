import React from "react";
import { Effect } from "../model/Effect";
import { useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";

export const ProgramList = () => {

    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <ul className="collection">
            {effectsList.map((i: Effect) => {
                return (
                    <div key={i.id} className="collection-item m-2">
                        <ProgramItem effect={i}/>
                    </div>)
            })}
        </ul>
    )
}

interface ProgramItemProps {
    effect: Effect;
}

export const ProgramItem = ({ effect }: ProgramItemProps) => {
    return (<div className="card">
        <button type="button" className="btn-close" aria-label="Close"/>
        <h5 className="card-title">{ effect.label }</h5>
        <div className="card-body">
            <div className="input-group mb-3 input-group-sm">
                <span className="input-group-text">Длина</span>
                <input type="text" className="form-control" disabled={true} value={effect.length()}/>
                <span className="input-group-text">сек.</span>
            </div>
        </div>
    </div>);
}
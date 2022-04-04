import React, { MouseEventHandler } from "react";
import { Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd, effectRemove } from "../reducer/programReducer";

export const ProgramList = () => {
    const dispatch = useDispatch();
    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <ul className="collection" style={{ maxHeight: 800, overflowY: "auto" }}>
            {effectsList.map((i: Effect, index) => {
                return (
                    <div key={i.id} className="collection-item m-2">
                        # {index + 1}
                        <ProgramItem effect={i}
                                     onClose={() => dispatch(effectRemove(i))}
                        onCopy={() => dispatch(effectAdd(i))}/>
                    </div>)
            })}
        </ul>
    )
}

interface ProgramItemProps {
    effect: Effect;
    onClose: MouseEventHandler<HTMLButtonElement>;
    onCopy?: MouseEventHandler;
    onMove?: MouseEventHandler;
}

export const ProgramItem = ({ effect, onClose, onCopy, onMove }: ProgramItemProps) => {
    const from = effect.colorSettings.from;
    return (<div className="card">

        <div className="container">
            <div className="row">
                <div className="col">
                    <h5 className="card-title">
                        {effect.label}
                    </h5>
                </div>
                <div className="col col-auto">
                    <div className="btn-group btn-group-sm float-end ">
                        <button type="button" onClick={onMove} className="btn"><span className="bi-arrows-move"/>
                        </button>
                        <button type="button" onClick={onCopy} className="btn"><span className="bi-clipboard"/>
                        </button>
                        <button type="button" onClick={onClose} className="btn btn-danger"><span className="bi-trash"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {}
        <div className="card-body">
            <div className="row">
                <div className="col col-auto">
                    <div style={{background: `rgb(${from.r}, ${from.g}, ${from.b})`, width: "2rem", height: "2rem" }}/>
                </div>
                <div className="col">
                    <div className="input-group mb-3 input-group-sm">
                        <span className="input-group-text">Длина</span>
                        <span className="input-group-text">{effect.length}</span>
                        <span className="input-group-text">сек.</span>
                    </div>
                </div>
            </div>
            <div className="float-end text-secondary text-sm-end">{effect.id}</div>
        </div>
    </div>);
}
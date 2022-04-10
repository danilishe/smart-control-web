import React, { MouseEventHandler } from "react";
import { AdditionalProperties, Effect } from "../model/Effect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer/rootReducer";
import { effectAdd, effectRemove } from "../reducer/programReducer";

function EffectHandlers(props: { index: number }) {
    return (
        <div className="card me-2">
            <div className="card-body">
                <div className="fs-6">
                    #{props.index + 1}
                </div>
            </div>
        </div>
    );
}

export const ProgramList = () => {
    const dispatch = useDispatch();
    const effectsList = useSelector((state: RootState) => state.programReducer.effects);
    return (
        <ul className="collection" style={{ maxHeight: 800, overflowY: "auto" }}>
            {effectsList.map((i: Effect, index) => {
                return (
                    <div key={i.id} className="collection-item m-2">
                        <div className="d-flex align-items-start">
                            <EffectHandlers index={index}/>
                            <ProgramItem effect={i}
                                         onClose={() => dispatch(effectRemove(i))}
                                         onCopy={() => dispatch(effectAdd(i))}/>
                        </div>

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

function trimTime(lengthMs: number): string {
    if (lengthMs < 1_000) return `${lengthMs} мсек.`
    if (lengthMs < 60_000) return `${lengthMs / 1_000} сек.`
    return `${lengthMs / 60_000} мин.`
}

interface AdditionalDataTableProps {
    data?: AdditionalProperties;
}

function AdditionalDataTable({ data }: AdditionalDataTableProps) {
    if (data === undefined || Object.keys(data).length === 0) return <></>
    else return (
        <table className={"table"}>
            <thead>
            <tr>
                {Object.keys(data).map((h, i) => <th scope="col" key={i}>{h}</th>)}
            </tr>
            </thead>
            <tbody>
            <tr>
                {Object.values(data).map((v, i) => <td key={i}>{v}</td>)}
            </tr>
            </tbody>
        </table>
    );
}

export const ProgramItem = ({ effect, onClose, onCopy, onMove }: ProgramItemProps) => {
    function colorList() {
        return effect.colorSettings.map((color, i) => <>
                <div className="me-2 border shadow-sm p-3 rounded"
                     style={{
                         background: `rgb(${color.r}, ${color.g}, ${color.b})`
                     }}/>
                {i + 1 < effect.colorSettings.length ? <i className="bi-arrow-right me-2"/> : ""}
            </>
        );
    }

    return (
        <div className="card p-2">
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
                            <button type="button" onClick={onClose} className="btn btn-danger"><span
                                className="bi-trash"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    {colorList()}
                    <div className="fs-5">{trimTime(effect.lengthMs)}</div>
                </div>
                <div className="row">
                    <div className="col">
                        <AdditionalDataTable data={effect.additionalPropertiesToDisplay}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Effect } from "../model/Effect";
import React, { MouseEventHandler } from "react";
import { trimTime } from "../utils";
import { AdditionalDataTable } from "./AdditionalDataTable";

interface ProgramItemCardProps {
    effect: Effect;
    index: number;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    onCopy?: MouseEventHandler<HTMLButtonElement>;
    onMove?: MouseEventHandler<HTMLButtonElement>;
}

export function ProgramItemCard({
                                    index, effect,
                                    onCopy, onClose, onMove,
                                }: ProgramItemCardProps) {
    return (
        <div className="card m-2 p-2" style={{ minWidth: "30rem" }}>
            <div className="card-body">
                <div className="d-flex">
                    <div className="fs-6 float-start">
                        #{index + 1}
                    </div>
                    <div className="float-end">
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
            <EffectCard effect={effect}/>

        </div>
    );
}

interface ProgramItemProps {
    effect: Effect;
}

const EffectCard = ({ effect }: ProgramItemProps) => {
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
            <div className="card-title">{effect.label}</div>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    {colorList()}
                    <div className="fs-5">{trimTime(effect.lengthMs)}</div>
                </div>
                <AdditionalDataTable data={effect.additionalPropertiesToDisplay}/>
            </div>
        </div>
    );
}
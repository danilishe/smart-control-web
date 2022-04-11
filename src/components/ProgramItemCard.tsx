import { Effect } from "../model/Effect";
import React, { MouseEventHandler, useMemo } from "react";
import { toFrames, trimTime } from "../utils";
import { AdditionalDataTable } from "./AdditionalDataTable";

interface ProgramItemCardProps {
    effect: Effect;
    index: number;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    onCopy?: MouseEventHandler<HTMLButtonElement>;
    onMove?: MouseEventHandler<HTMLElement>;
}

export function ProgramItemCard({
                                    index, effect,
                                    onCopy, onClose, onMove,
                                }: ProgramItemCardProps) {
    return (
        <div className="card" style={{ minWidth: "30rem" }}>
            <div className="card-body">
                <div className="row">
                    <div className="col-1 d-flex flex-column">
                        <div className="fs-6 fw-lighter">
                            #{index + 1}
                        </div>
                        <div style={{ height: "2rem", width: "2rem" }} onDrag={onMove} className="fs-3 bi-arrows-move"/>
                    </div>
                    <div className="col-10"><EffectCard effect={effect}/></div>
                    <div className="col-1">
                        <button onClick={onCopy} className="btn btn-lg"><span className="bi-clipboard"/>
                        </button>
                        <button  onClick={onClose} className="btn btn-lg btn-danger"><span
                            className="bi-trash"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ProgramItemProps {
    effect: Effect;
}

const EffectCard = ({ effect }: ProgramItemProps) => {
    const colorPalette = useMemo(() => effect.colorSettings.map((color, i) => <>
                <div className="me-2 border shadow-sm p-3 rounded"
                     style={{
                         background: `rgb(${color.r}, ${color.g}, ${color.b})`
                     }}/>
                {i + 1 < effect.colorSettings.length ? <i className="bi-arrow-right me-2"/> : ""}
            </>), [effect.colorSettings]);

    const effectLength = useMemo(() => trimTime(effect.lengthMs), [effect.lengthMs]);
    const effectLengthFrames = useMemo(() => toFrames(effect.lengthMs), [effect.lengthMs]);

    return (
        <div className="card">
            <div className="card-title">{effect.label}</div>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    {colorPalette}
                    <div className="fs-5">
                        {effectLength}
                        <span className="fs-6 fw-lighter">/{effectLengthFrames} кадров</span>
                    </div>
                </div>
                <AdditionalDataTable data={effect.additionalPropertiesToDisplay}/>
            </div>
        </div>
    );
}
import { Effect } from "../model/Effect";
import React, { MouseEventHandler, useMemo } from "react";
import { toFrames, trimTime } from "../utils";
import { AdditionalDataTable } from "./AdditionalDataTable";
import { useDispatch } from "react-redux";
import { effectUpdate } from "../reducer/programReducer";

interface ProgramItemCardProps {
    effect: Effect;
    index: number;
    onClose?: MouseEventHandler<HTMLElement>;
    onCopy?: MouseEventHandler<HTMLElement>;
    onMove?: MouseEventHandler<HTMLElement>;
}

export function ProgramItemCard({
                                    index, effect,
                                    onCopy, onClose, onMove,
                                }: ProgramItemCardProps) {
    return (
        <div className="card w-auto">
            <div className="card-body">
                <div className="row gap-1 g-0">
                    <div className="col-auto">
                        <div className="fs-6 fw-lighter text-nowrap">
                            #{index + 1}
                        </div>
                        <div style={{ height: "2rem", width: "2rem" }} onDrag={onMove}
                             className="fs-3 bi-arrows-move" />
                    </div>
                    <div className="col"><EffectCard effect={effect} /></div>
                    <div className="col-auto">
                        <div onClick={onCopy} className="btn d-block btn-lg"><span className="bi-clipboard" />
                        </div>
                        <div onClick={onClose} className="btn d-block btn-lg btn-danger"><span
                            className="bi-trash" />
                        </div>
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
    const colorPalette = useMemo(() => effect.colorSettings.map((color, i) =>
        <>
            <div key={i} className="border shadow-sm p-3 rounded col-auto"
                 style={{
                     background: `rgb(${color.r}, ${color.g}, ${color.b})`
                 }} />
            {i + 1 < effect.colorSettings.length ? <i key={"-" + i} className="col-auto bi-arrow-right" /> : ""}
        </>), [effect.colorSettings]);

    const effectLengthFrames = useMemo(() => toFrames(effect.lengthMs), [effect.lengthMs]);

    let dispatch = useDispatch();

    const applyLength = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(effectUpdate({
        ...effect,
        lengthMs: Math.max(
            Math.min(parseInt(event.target.value) || 0, 60_000)
            , 1) * 1_000
    }));

    return (
        <div className="card">
            <div className="card-title">{effect.label}</div>
            <div className="card-body">
                <div className="row align-items-center">
                    {colorPalette}
                    <div className="col-auto fs-5">
                        <div className="input-group">
                            <input className="form-control"
                                   min={1}
                                   max={60_000}
                                   type="number"
                                   value={effect.lengthMs / 1000}
                                   onChange={applyLength} />
                            <div className="input-group-append">
                                <span className="input-group-text">{effectLengthFrames}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <AdditionalDataTable data={effect.additionalPropertiesToDisplay} />
            </div>
        </div>
    )
        ;
}

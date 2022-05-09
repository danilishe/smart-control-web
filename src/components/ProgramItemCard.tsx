import { Effect } from "../model/Effect";
import React, { MouseEventHandler, useMemo } from "react";
import { toFrames } from "../utils";
import { AdditionalDataTable } from "./AdditionalDataTable";
import { useDispatch } from "react-redux";
import { effectUpdate } from "../reducer/programReducer";
import Color from "../model/Color";

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

function toHex(n: number) {
    return n.toString(16).padStart(2, "0");
}

function toHexColor(color: Color) {
    return `#${toHex(color.r) + toHex(color.g) + toHex(color.b)}`;
}

function getColorFromHex(color: string) {
    return {
        r: parseInt(color.substring(1, 3), 16),
        g: parseInt(color.substring(3, 5), 16),
        b: parseInt(color.substring(5, 7), 16),
    };
}

const EffectCard = ({ effect }: ProgramItemProps) => {
    const colorPalette = useMemo(() =>
            <div className="input-group">
                {effect.colorSettings.map((color, i) =>
                    <>
                        <input type="color"
                               className="form-control form-control-color"
                               style={{ width: "2.5rem" }}
                               key={i}
                               value={toHexColor(color)}
                               onChange={(event) => {
                                   const newColors = [...effect.colorSettings];
                                   newColors[i] = getColorFromHex(event.target.value)
                                   dispatch(effectUpdate({ ...effect, colorSettings: newColors }))
                               }}
                        />
                    </>)}
            </div>, [effect.colorSettings]
        )
    ;

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
                <div className="row justify-content-start align-items-center">
                    <div className="col-auto">{colorPalette}</div>
                    <div className="col-auto">
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

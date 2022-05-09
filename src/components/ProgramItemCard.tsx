import { Effect } from "../model/Effect";
import React, { MouseEventHandler } from "react";
import { toFrames } from "../util/utils";
import { AdditionalDataTable } from "./AdditionalDataTable";
import { useDispatch } from "react-redux";
import { effectUpdate } from "../reducer/programReducer";
import { getColorFromHex, toHexColor } from "../util/colorUtils";
import { AppParams } from "../defaultParams";

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
        <div className="card w-auto" onDrag={onMove}>
            <div className="card-body">
                <div className="row gap-1 g-0">
                    <div className="col-auto">
                        <div className="fs-6 fw-lighter text-nowrap">
                            #{index + 1}
                        </div>
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
    let dispatch = useDispatch();

    const applyLength = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(effectUpdate({
        ...effect,
        lengthMs: Math.max(
            Math.min(parseInt(event.target.value) || 0, AppParams.maxEffectLengthSec)
            , AppParams.minEffectLengthSec) * 1_000
    }));

    return (
        <div className="card">
            <div className="card-title">{effect.label}</div>
            <div className="card-body">
                <div className="row justify-content-start align-items-center">
                    <div className="col-auto">
                        <div className="input-group">
                            {effect.colorSettings.map((color, i) =>
                                <>
                                    <input type="color"
                                           list="true"
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
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="input-group">
                            <input className="form-control"
                                   min={1}
                                   max={AppParams.maxEffectLengthSec}
                                   type="number"
                                   value={effect.lengthMs / 1000}
                                   onChange={applyLength} />
                            <span className="input-group-text">сек.</span>
                            <span className="input-group-text">{toFrames(effect.lengthMs)} кадров</span>
                        </div>
                    </div>
                </div>
                <AdditionalDataTable data={effect.additionalPropertiesToDisplay} />
            </div>
        </div>
    )
        ;
}

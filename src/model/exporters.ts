import { Effect } from "./Effect";
import Color from "./Color";
import { toFrames } from "../utils";
import { clonify, createGradient } from "./colorUtils";

export type EffectExporter = (channels: number, effect: Effect) => ProgramSnippet;

// Program goes from left to right, but on export this order transforms to up to bottom
export type ProgramSnippet = Array<Array<Color>>;


export const smoothChangeExporter: EffectExporter = (channels, effect) => {
    const framesCount = toFrames(length);
    return Array(channels).fill(createGradient(effect.colorSettings, framesCount))
}

export const solidColorExporter: EffectExporter = (channels, effect) => {
    return Array(channels)
        .fill(clonify(effect.colorSettings[0], toFrames(effect.lengthMs)));
};

export const sharpChangeExporter: EffectExporter = (channels, effect) => {
    const framesCount = toFrames(length);
    return Array(channels).fill(createGradient(effect.colorSettings, framesCount, false));
}
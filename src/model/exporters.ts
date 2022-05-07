import { Effect } from "./Effect";
import Color from "./Color";
import { toFrames } from "../utils";
import { clonify, createGradient } from "./colorUtils";
import { ProgramSettings } from "../defaultParams";
import { AppParams } from "../defaultParams";

export type EffectExporter = (channels: number, effect: Effect) => ProgramSnippet;

// Program goes from left to right, but on export this order transforms to up to bottom
export type ProgramSnippet = Array<Array<Color>>;


export const smoothChangeExporter: EffectExporter = (channels, effect) => {
    const framesCount = toFrames(effect.lengthMs);
    return Array(channels).fill(createGradient(effect.colorSettings, framesCount))
}

export const solidColorExporter: EffectExporter = (channels, effect) => {
    return Array(channels)
        .fill(clonify(effect.colorSettings[0], toFrames(effect.lengthMs)));
};

export const sharpChangeExporter: EffectExporter = (channels, effect) => {
    const framesCount = toFrames(effect.lengthMs);
    return Array(channels).fill(createGradient(effect.colorSettings, framesCount, false));
}

export function createDataLink(settings: typeof ProgramSettings, effects: Array<Effect>): string {
    const result: ProgramSnippet = new Array<Array<Color>>(settings.channelsCount)
        .fill(new Array<Color>());
    for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];
        const effectSnippet = effect.exporter(settings.channelsCount, effect);
        for (let j = 0; j < effectSnippet.length; j++) {
            const channel = effectSnippet[j];
            result[i] = result[i].concat(channel); // TODO: looks like low efficiency 
        }
    }

    const programLength = result[0].length;
    const frames: Array<string> = new Array<string>();
    for (let i = 0; i < programLength; i++) {
        frames.push(String.fromCharCode(...result.map(ch => ch[i].r))); // only mono color

    }

    effects.map(e => {
        e.exporter(settings.channelsCount, e);
    })

    const file = new Blob(frames, {
        type: "application/octet-stream",
    })
    const reader = new FileReader();
    reader.onload = () => {
    }
    reader.readAsDataURL(file);

    return "";
}

export enum ColorMode {
    Mono,
    RGB
}

export function formFrame(channels: number[]): Array<number> {
    let trimmedChannels = channels.slice(0, AppParams.maxChannelsCount);
    return trimmedChannels.concat(Array(AppParams.maxChannelsCount - trimmedChannels.length).fill(0));
}

export function exportColor(color: Color, mode: ColorMode): Array<number> {
    switch (mode) {
        default:
            return [color.r];
    }
}
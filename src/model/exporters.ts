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
    const snippet: ProgramSnippet = joinExportedEffects(settings.bulbsCount, effects)
    const frames = flipSnippet(snippet);
    const binaryProgram: string[] = frames
        .map(frame => convertBulbsToChannels(frame, settings.colorMode))
        .map(formFrame)
        .map(arrayToString);

    const file = new Blob(binaryProgram, {
        type: "application/octet-stream",
    });

    let result : string;
    const reader = new FileReader();
    reader.onload = () => {
        result = reader.result as string;
    }
    reader.readAsDataURL(file);

    return result!;
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

export function arrayToString(values: number[]): string {
    return String.fromCharCode(...values);
}

function joinExportedEffects(channelsCount: number, effects: Effect[]): ProgramSnippet {
    const result = new Array<Array<Color>>(channelsCount)
        .fill(new Array<Color>());
    for (let i = 0; i < effects.length; i++) {
        const effect = effects[i];
        const effectSnippet = effect.exporter(channelsCount, effect);
        for (let j = 0; j < effectSnippet.length; j++) {
            const channel = effectSnippet[j];
            result[i] = result[i].concat(channel); // TODO: looks like low efficiency 
        }
    }
    return result;
}
function flipSnippet(snippet: ProgramSnippet): ProgramSnippet {
    const programLength = snippet[0].length;
    const result = Array<Array<Color>>(programLength);
    for (let frameIndex = 0; frameIndex < programLength; frameIndex++) {
        const frame = Array(snippet.length);
        snippet.forEach((bulbProgram, bulbIndex) => frame[bulbIndex] = bulbProgram[frameIndex]);
        result[frameIndex] = frame;
    }
    return result;
}

function convertBulbsToChannels(frame: Color[], mode: ColorMode): number[] {
    return frame.flatMap(c => exportColor(c, mode));
}


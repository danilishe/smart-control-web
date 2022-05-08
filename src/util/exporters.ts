import { AppParams, ProgramSettings } from "../defaultParams";
import { toFrames } from "../utils";
import Color from "../model/Color";
import { ColorMode } from "../model/ColorMode";
import { clonify, createGradient } from "./colorUtils";
import { Effect } from "../model/Effect";

export type EffectExporter = (bulbsCount: number, effect: Effect) => ProgramSnippet;

// Program goes from left to right, but on export this order transforms to up to bottom
export type ProgramSnippet = Array<Array<Color>>;


export const smoothChangeExporter: EffectExporter = (bulbsCount, effect) => {
    const framesCount = toFrames(effect.lengthMs);
    return Array(bulbsCount).fill(createGradient(effect.colorSettings, framesCount))
}

export const solidColorExporter: EffectExporter = (bulbsCount, effect) => {
    return Array(bulbsCount)
        .fill(clonify(effect.colorSettings[0], toFrames(effect.lengthMs)));
};

export const sharpChangeExporter: EffectExporter = (bulbsCount, effect) => {
    const framesCount = toFrames(effect.lengthMs);
    return Array(bulbsCount).fill(createGradient(effect.colorSettings, framesCount, false));
}

export async function createDataLink(settings: typeof ProgramSettings, effects: Array<Effect>): Promise<string> {
    const binaryProgram: string[] = toBinaryFrames(effects, settings.bulbsCount, settings.colorMode);

    const file = new Blob(binaryProgram, {
        type: "application/octet-stream",
    });

    return blobToDataUrl(file);
}

function blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = _e => resolve(reader.result as string);
      reader.onerror = _e => reject(reader.error);
      reader.onabort = _e => reject(new Error("Read aborted"));
      reader.readAsDataURL(blob);
    });
  }

export function toBinaryFrames(effects: Effect[], bulbsCount: number, colorMode: ColorMode): string[] {
    const snippet: ProgramSnippet = joinExportedEffects(bulbsCount, effects)
    const frames = flipSnippet(snippet);
    return frames
        .map(frame => convertBulbsToChannels(frame, colorMode))
        .map(formFrame)
        .map(arrayToString);
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

export function joinExportedEffects(bulbsCount: number, effects: Effect[]): ProgramSnippet {
    const result = Array<Color[]>(bulbsCount)
        .fill(Array<Color>());
    effects.forEach((effect) => {
        const effectSnippet = effect.exporter(bulbsCount, effect);
        effectSnippet.forEach((bulbProgram, bulbIndex) => {
            result[bulbIndex] = [...result[bulbIndex], ...bulbProgram];
        })
    })
    return result;
}
export function flipSnippet(snippet: ProgramSnippet): ProgramSnippet {
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


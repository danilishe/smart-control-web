import { toFrames } from "../utils";
import Color from "./Color";

export interface Effect {
    description: string;
    id: string;
    label: string;
    colorSettings: Color[];
    lengthMs: number;
    additionalPropertiesToDisplay?: AdditionalProperties;
    exporter: (channels: number) => ProgramSnippet;
}

type ProgramSnippet = Array<Array<Color>>;

export interface AdditionalProperties {
    [key: string]: string | number;
}

function smoothChangeExporter(effect: Effect, channels: number): ProgramSnippet {
// TODO
    const framesCount = toFrames(effect.lengthMs);
    const framesPerColor = framesCount / (effect.colorSettings.length - 1);
    return new Array(framesCount)
        .fill(Array(channels)
            .fill(effect.colorSettings[0]));
}

export const smoothChange: Effect = {
    colorSettings: [
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 }
    ],
    id: "smooth change",
    label: "Плавный перелив",
    description: "Плавный перелив из одного цвета в другой по всей длине программы",
    lengthMs: 2_000,
    exporter: function (channels) {
        return smoothChangeExporter(this, channels)
    }
}

export const solidColor: Effect = {
    colorSettings: [
        { r: 0, g: 0, b: 0 },
    ],
    id: "solid color",
    label: "Сплошной цвет",
    description: "Программа с одним сплошным цветом",
    lengthMs: 5_000,
    exporter: function (channels) {
        return Array(toFrames(this.lengthMs))
            .fill(Array(channels)
                .fill(this.colorSettings[0]));
    }
}

export const sharpChange: Effect = {
    colorSettings: [
        { r: 255, g: 255, b: 255 },
        { r: 0, g: 0, b: 0 },
    ],
    id: "sharp change",
    label: "Резкое переключение",
    description: "Резкое переключение цвета через указанный промежуток времени",
    lengthMs: 5_000,
}

export const ALL_EFFECTS = [ smoothChange, sharpChange, solidColor ];
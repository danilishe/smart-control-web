import { toFrames } from "../utils";
import Color from "./Color";
import { clonify, createGradient } from "./colorUtils";

export interface Effect {
    description: string;
    id: string;
    label: string;
    colorSettings: Color[];
    lengthMs: number;
    additionalPropertiesToDisplay?: AdditionalProperties;
    exporter: (channels: number) => ProgramSnippet;
}

// Program goes from left to right, but on export this order transforms to up to bottom
type ProgramSnippet = Array<Array<Color>>;

export interface AdditionalProperties {
    [key: string]: string | number;
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
        const framesCount = toFrames(length);
        return Array(channels).fill(createGradient(this.colorSettings, framesCount))
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
        return Array(channels)
            .fill(clonify(this.colorSettings[0], toFrames(this.lengthMs)));
    }
}

export const sharpChange: Effect = {
    exporter(channels: number): ProgramSnippet {
        const framesCount = toFrames(length);
        return Array(channels).fill(createGradient(this.colorSettings, framesCount, false));
    },
    colorSettings: [
        { r: 255, g: 255, b: 255 },
        { r: 0, g: 0, b: 0 },
    ],
    id: "sharp change",
    label: "Резкое переключение",
    description: "Резкое переключение цвета через указанный промежуток времени",
    lengthMs: 5_000
}

export const ALL_EFFECTS = [ smoothChange, sharpChange, solidColor ];
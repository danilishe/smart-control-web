import Color from "./Color";
import { EffectExporter, sharpChangeExporter, smoothChangeExporter, solidColorExporter } from "./exporters";

export interface Effect {
    id: string;
    label: string;
    description: string;
    additionalPropertiesToDisplay?: AdditionalProperties;
    exporter: EffectExporter;
    colorSettings: Color[];
    lengthMs: number;
}

export interface AdditionalProperties {
    [key: string]: string | number;
}

export const smoothChange: Effect = {
    id: "smooth change",
    label: "Плавный перелив",
    description: "Плавный перелив из одного цвета в другой по всей длине программы",
    exporter: smoothChangeExporter,
    colorSettings: [
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 }
    ],
    lengthMs: 2_000,
}

export const solidColor: Effect = {
    id: "solid color",
    label: "Сплошной цвет",
    description: "Программа с одним сплошным цветом",
    exporter: solidColorExporter,
    colorSettings: [
        { r: 0, g: 0, b: 0 },
    ],
    lengthMs: 5_000
}

export const sharpChange: Effect = {
    id: "sharp change",
    label: "Резкое переключение",
    description: "Резкое переключение цвета через указанный промежуток времени",
    exporter: sharpChangeExporter,
    colorSettings: [
        { r: 255, g: 255, b: 255 },
        { r: 0, g: 0, b: 0 },
    ],
    lengthMs: 5_000
}

export const ALL_EFFECTS = [ smoothChange, sharpChange, solidColor ];
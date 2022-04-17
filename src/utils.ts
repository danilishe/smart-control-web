import Parameters from "./parameters";
import Color from "./model/Color";

export function trimTime(lengthMs: number): string {
    if (lengthMs < 1_000) return `${lengthMs} мсек.`
    if (lengthMs < 60_000) return `${lengthMs / 1_000} сек.`
    return `${lengthMs / 60_000} мин.`
}

export function toFrames(length: number) {
    return Math.round(length / Parameters.minFrameLength);
}

export function colorMix(from: Color, to: Color, grade: number): Color {
    if (grade < 0 || grade > 1) {
        console.warn(`grade value ${grade} should be in 0...1 limits`);
    }
    return {
        b: (to.b - from.b) * grade + from.b,
        g: (to.g - from.g) * grade + from.g,
        r: (to.r - from.r) * grade + from.r,
    } as Color;
}
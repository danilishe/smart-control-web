import Color from "../model/Color";

function plus(initial: Color, deltaColor: Color, multiplier: number): Color {
    return {
        r: initial.r + deltaColor.r * multiplier,
        g: initial.g + deltaColor.g * multiplier,
        b: initial.b + deltaColor.b * multiplier,
    };
}

export function createSmoothDelta(from: Color, to: Color, frames: number): Array<Color> {
    if (frames < 0 || frames !== Math.round(frames)) {
        throw new Error("Длина генерируемого массива должна быть целым положительным числом");
    }
    const deltaColor = {
        r: (to.r - from.r) / (frames + 1),
        g: (to.g - from.g) / (frames + 1),
        b: (to.b - from.b) / (frames + 1),
    };
    return new Array(frames).fill(0)
        .map((_, index) => plus(from, deltaColor, index + 1));
}


export function clonify(color: Color, expectedLength: number): Array<Color> {
    if (expectedLength < 0 || expectedLength !== Math.round(expectedLength)) {
        throw new Error("Длина генерируемого массива должна быть целым положительным числом");
    }
    return Array(expectedLength).fill({ ...color });
}

export function createGradient(colors: Color[], length: number, smooth = true): Color[] {
    const keyFrames = colors.length;
    if (keyFrames < 2) throw new Error("Количество цветов не может быть меньше 2");
    const gaps = keyFrames - 1;
    const lastKeyframeIndex = keyFrames - 1;
    const gapFrames = Math.floor((length - keyFrames) / gaps);
    const garbage = length - keyFrames - gapFrames * gaps;
    const result = Array<Color>();

    function getDeltaColors(prevColor: Color, nextColor: Color, frames: number) {
        return smooth ? createSmoothDelta(prevColor, nextColor, frames) : clonify(prevColor, frames);
    }

// last gap should contain "garbage" frames
    for (let i = 0; i < gaps - 1; i++) {
        result.push(
            colors[i],
            ...(getDeltaColors(colors[i], colors[i + 1], gapFrames))
        );
    }
    // that's why it has different frames count and is added separately
    const preLastColor = colors[lastKeyframeIndex - 1];
    const lastColor = colors[lastKeyframeIndex];
    result.push(
        { ...colors[gaps] },
        ...getDeltaColors(preLastColor, lastColor, gapFrames + garbage),
        { ...colors[keyFrames] }
    );
    return result;
}
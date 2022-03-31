type ColorSettings = {
    from: Color;
    to: Color;
}

interface Color {
    r: number;
    g: number;
    b: number;
}

export interface Effect {
    description: string;
    id: string;
    label: string;
    colorSettings: ColorSettings;

    paramsDescription(): string;

    framesCount(): number;

    length(): number;
}

const fadeIn: Effect = {
    colorSettings: {
        from: {r: 23, g: 345, b: 345},
        to: {r: 23, g: 345, b: 345}
    },
    id: "fade in",
    label: "Fade In",
    description: "Smooth fade in effect",
    framesCount: () => {
        return 0;
    },

    length() {
        return 0;
    },

    paramsDescription() {
        return "";
    }
}

export {fadeIn}
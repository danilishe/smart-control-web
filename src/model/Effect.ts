type ColorSettings = {
    from: Color;
    to?: Color;
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
    label: "Простой перелив",
    description: "Простое изменение цвета от первого ко второму за указанное время",
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
const solidColor: Effect = {
    colorSettings: {
        from: {r: 23, g: 345, b: 345}
    },
    id: "solid color",
    label: "Сплошной цвет",
    description: "Программа с одним сплошным цветом",
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

export {fadeIn, solidColor}
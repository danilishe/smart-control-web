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
    length: number;
}

const fadeIn: Effect = {
    colorSettings: {
        from: { r: 0, g: 0, b: 0 },
        to: { r: 255, g: 255, b: 255 }
    },
    id: "fade in",
    label: "Простой перелив",
    description: "Простое изменение цвета от первого ко второму за указанное время",
    length: 2
}
const solidColor: Effect = {
    colorSettings: {
        from: { r: 0, g: 0, b: 0 }
    },
    id: "solid color",
    label: "Сплошной цвет",
    description: "Программа с одним сплошным цветом",
    length: 5
}

export { fadeIn, solidColor }
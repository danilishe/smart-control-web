interface Color {
    r: number;
    g: number;
    b: number;
}

export interface Effect {
    description: string;
    id: string;
    label: string;
    colorSettings: Color[];
    lengthMs: number;
    additionalPropertiesToDisplay?: AdditionalProperties;
}

export interface AdditionalProperties {
    [key: string]: string | number;
}

const smoothChange: Effect = {
    colorSettings: [
        { r: 0, g: 0, b: 0 },
        { r: 255, g: 255, b: 255 }
    ],
    id: "smooth change",
    label: "Плавный перелив",
    description: "Плавный перелив из одного цвета в другой по всей длине программы",
    lengthMs: 2_000,
    additionalPropertiesToDisplay: {
        "some": "q12341234",
        "aaefa": 23452345,
        "j": "q12341234",
        "mlkjlk kj": 23452345,
        "sokjlme": "q1 2341234",
        "amnaefa": 23452345,
        "sokj;klme": "q12341 234",
        "aklefa": 23452345,
    }
}
const solidColor: Effect = {
    colorSettings: [
        { r: 0, g: 0, b: 0 },
    ],
    id: "solid color",
    label: "Сплошной цвет",
    description: "Программа с одним сплошным цветом",
    lengthMs: 5_000,
}

const sharpChange: Effect = {
    colorSettings: [
        { r: 255, g: 255, b: 255 },
        { r: 0, g: 0, b: 0 },
    ],
    id: "sharp change",
    label: "Резкое переключение",
    description: "Резкое переключение цвета через указанный промежуток времени",
    lengthMs: 5_000,
}

export { smoothChange, sharpChange, solidColor }
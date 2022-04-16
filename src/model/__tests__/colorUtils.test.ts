import { clonify, createGradient, createSmoothDelta } from "../colorUtils";
import Color from "../Color";

beforeAll(() => {
});

afterAll(() => {
});

describe("переход", () => {
    describe("плавный", () => {
        test('нулевая дельта', () => {
            const black: Color = { r: 0, g: 0, b: 0 }
            const white: Color = { r: 255, g: 255, b: 255 }
            const smoothChange = createSmoothDelta(black, white, 0);
            expect(smoothChange).toHaveLength(0);
        });

        test('промежуточная дельта', () => {
            const smoothChange = createSmoothDelta({ r: 0, g: 0, b: 0 }, { r: 100, g: 100, b: 100 }, 3);
            expect(smoothChange).toHaveLength(3);
            expect(smoothChange[0]).toEqual({ r: 25, g: 25, b: 25 });
            expect(smoothChange[1]).toEqual({ r: 50, g: 50, b: 50 });
            expect(smoothChange[2]).toEqual({ r: 75, g: 75, b: 75 });
        });

        test('отрицательный переход', () => {
            const smoothChange = createSmoothDelta(
                { r: 100, g: 100, b: 100 },
                { r: 0, g: 0, b: 0 },
                3);
            expect(smoothChange).toHaveLength(3);
            expect(smoothChange[0]).toEqual({ r: 75, g: 75, b: 75 });
            expect(smoothChange[1]).toEqual({ r: 50, g: 50, b: 50 });
            expect(smoothChange[2]).toEqual({ r: 25, g: 25, b: 25 });
        });

        test.each([ -1, 1.5 ])
        ('бросает ошибку при некорректом параметре = %d', (wrongValue) => {
            const black: Color = { r: 0, g: 0, b: 0 }
            expect(() => createSmoothDelta(black, black, wrongValue))
                .toThrow("Длина генерируемого массива должна быть целым положительным числом");
        });
    })
    describe("клонификация", () => {
        test('повторяет первый элемент нужное количество раз', () => {
            const expectedLength = 10;
            const black: Color = { r: 0, g: 0, b: 0 }
            const stepChange = clonify(black, expectedLength);
            expect(stepChange).toHaveLength(expectedLength);
            stepChange.forEach(e => expect(e).toEqual(black));
        });

        test.each([ -1, 1.5 ])
        ('бросает ошибку при некорректом параметре = %d', (wrongValue) => {
            const black: Color = { r: 0, g: 0, b: 0 }
            expect(() => clonify(black, wrongValue))
                .toThrow("Длина генерируемого массива должна быть целым положительным числом");
        });
    })

})
describe("градиент", () => {
    test('создаёт градиент с промежуточными цветами', () => {
        const black: Color = { r: 0, g: 0, b: 0 };
        const white: Color = { r: 255, g: 255, b: 255 };
        const green: Color = { r: 0, g: 255, b: 0 };
        const gradient = createGradient([ black, white, green ], 5);
        expect(gradient).toHaveLength(5);
    });

    test('не теряет кадры при нечётном делении', () => {
        const black: Color = { r: 0, g: 0, b: 0 };
        const white: Color = { r: 255, g: 255, b: 255 };
        const green: Color = { r: 0, g: 255, b: 0 };
        const gradient = createGradient([ black, white, green ], 4);
        expect(gradient).toHaveLength(4);
    });

    test.each([
        [ [ { r: 0, g: 0, b: 0 } ], 999, "Количество цветов не может быть меньше 2" ],
    ])
    ('бросает "%2s" при %3s', (colors: Color[], length: number, error: string) => {
        expect(() => createGradient(colors, length))
            .toThrow(error);
    });


})
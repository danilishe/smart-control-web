import { AppParams } from "../../defaultParams";
import Color from "../../model/Color";
import { ColorMode } from "../../model/ColorMode";
import { solidColor } from "../../model/Effect";
import { arrayToString, toBinaryFrames, exportColor, formFrame, joinExportedEffects, solidColorExporter, flipSnippet } from "../exporters";

const testColor: Color = { r: 32, g: 32, b: 32 };
const oneFrameSolidColorEffect = {
    ...solidColor,
    colorSettings: [testColor],
    lengthMs: AppParams.minFrameLength
}

beforeAll(() => {
});

afterAll(() => {
});
describe("export'", () => {

    test.each([
        [Array<number>(0).fill(255)],
        [Array<number>(2).fill(255)],
        [Array<number>(AppParams.maxChannelsCount).fill(255)],
        [Array<number>(AppParams.maxChannelsCount + 1).fill(255)],
    ])('fills every array up to maximum and trimms ' + AppParams.maxChannelsCount, (frame: Array<number>) => {
        expect(formFrame(frame)).toHaveLength(AppParams.maxChannelsCount);
    });

    test('fills every array up to maximum with zeroes', () => {
        expect(formFrame([])).toEqual(Array(AppParams.maxChannelsCount).fill(0));
    });

    test('uses red channel from rgb in bw mode ', () => {
        expect(exportColor({ r: 255, g: 125, b: 0 }, ColorMode.Mono)).toEqual([255]);
    });

    test('converts array to string', () => {
        expect(arrayToString([10, 32, 0])).toEqual("\n \0");
    });

    test('creates proper binary', () => {
        expect(toBinaryFrames(
            [oneFrameSolidColorEffect],
            1, ColorMode.Mono
        )).toEqual([String.fromCharCode(testColor.r).concat(Array(AppParams.maxChannelsCount - 1).fill("\0").join(""))]);
    });


    test('joins effects', () => {
        const joinedSnippets = joinExportedEffects(1, [oneFrameSolidColorEffect, oneFrameSolidColorEffect]);
        expect(joinedSnippets).toEqual([[testColor, testColor]]);
    });

    test('flips snippet', () => {
        expect(flipSnippet([[testColor, testColor]])).toEqual([[testColor], [testColor]]);
    });


    // test('return base64 data link', async () => {
    //     const testProgram = Array(AppParams.maxChannelsCount).fill(0);
    //     const testEffect: Effect = {
    //        ...solidColor,
    //         exporter: (channels, effect) => {
    //             return Array(length);
    //         },
    //         lengthMs: AppParams.minFrameLength,
    //     }
    //     const file = new Blob(testProgram, {
    //         type: "application/octet-stream",
    //     })
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         expect()
    //     }
    //     reader.readAsDataURL(file);

    //  });
})

describe("effect exporter", () => {
    test("solid color exporter", () => {
        expect(solidColorExporter(1, oneFrameSolidColorEffect)).toEqual([[testColor]])
    });
})

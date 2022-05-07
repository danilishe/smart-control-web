import { AppParams } from "../../defaultParams";
import { arrayToString, ColorMode, exportColor, formFrame } from "../exporters";

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
    
    test('uses subfunction in expected order', () => {
        // effect 8 ch
        // call exporter
        // join snippents
        // get slices of frames
        // convert bulbs to channels
        // extend each frame to max channels
        // convert to string
        // join to string array and create blob
        // convert to base64
        expect(arrayToString).toBeCalled();
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


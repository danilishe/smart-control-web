import { ColorMode } from "./model/ColorMode";

export const AppParams = {
    minFrameLength: 40,
    maxChannelsCount: 45,
    defaultExportFileName: "program.bin",
    maxEffectLengthSec: 60_000,
    minEffectLengthSec: 1,
}

export const ProgramSettings = {
    bulbsCount: 8,
    colorMode: ColorMode.Mono,
};
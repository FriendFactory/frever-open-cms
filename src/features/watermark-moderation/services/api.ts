import { ThumbnailFile } from "shared";

export interface Watermark {
    id: number;
    name: string;
    durationSeconds: number;
    files: ThumbnailFile[];
    positions: PositionSettings[];
}

export type WatermarkTag = "PORTRAIT" | "LANDSCAPE";

export interface PositionSettings {
    videoOrientation: number;
    offsetX: number;
    offsetY: number;
    scale: number;
}

export const VideoOrientation = {
    Portrait: 1,
    Landscape: 2
};

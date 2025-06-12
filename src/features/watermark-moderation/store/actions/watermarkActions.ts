import { defineAction } from "rd-redux-utils";

import { Watermark } from "features/watermark-moderation";
import { WatermarkTag } from "features/watermark-moderation/services";

export interface WatermarkWithImages {
    item: Partial<Watermark>;
    newImages?: { file: number; extension: number; resolution: string | null; tags?: [WatermarkTag]; newFile: File }[];
}

export const upsertWatermarksAction = defineAction<{ stage: string; items: Watermark[] }>("UPDATE WATERMARK");

export const upsertSingleWatermarkAction =
    defineAction<{ stage: string; data: WatermarkWithImages }>("UPDATE SINGLE WATERMARK");

export const upsertWatermarksOkAction = defineAction<{ stage: string; data: Watermark[] }>("UPDATE WATERMARK OK");

import { defineActionGroup } from "rd-redux-utils";

import { Watermark, WatermarkListQueryParams } from "features/watermark-moderation";

export const watermarkListActionGroup =
    defineActionGroup<{ stage: string; params: WatermarkListQueryParams }>("WATERMARK LIST");

export const watermarkListLoadAction = watermarkListActionGroup.defineAction("LOAD");

export const watermarkListLoadingAction = watermarkListActionGroup.defineAction("LOADING");

export const watermarkListLoadedOkAction =
    watermarkListActionGroup.defineAction<{ data: Watermark[]; total?: number }>("LOADED OK");

export const watermarkListLoadedErrorAction = watermarkListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

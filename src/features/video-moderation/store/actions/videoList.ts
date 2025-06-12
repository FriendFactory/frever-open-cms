import { defineActionGroup } from "rd-redux-utils";
import { ResultWithCount } from "shared";
import { GetVideoListParams, Video } from "../../services";

export const videoModerationListActionGroup = defineActionGroup<{
    params: GetVideoListParams;
    stage: string;
}>("VIDEO MODERATION LIST");

export const videoModerationListLoadAction = videoModerationListActionGroup.defineAction("LOAD");

export const videoModerationListLoadingAction = videoModerationListActionGroup.defineAction("LOADING");

export const videoModerationListLoadedOkAction = videoModerationListActionGroup.defineAction<{
    result: ResultWithCount<Video>;
}>("LOADED OK");

export const videoModerationListLoadedErrorAction = videoModerationListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

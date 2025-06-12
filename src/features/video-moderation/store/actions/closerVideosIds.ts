import { GetVideoListParams } from "features/video-moderation/services";
import { defineActionGroup } from "rd-redux-utils";

import { CloserVideosIdsState } from "../reducer";

export const closerVideosIdsActionGroup = defineActionGroup<{
    stage: string;
    videoId: number;
    params: GetVideoListParams;
}>("CLOSER VIDEOS IDS");

export const closerVideosIdsAction = closerVideosIdsActionGroup.defineAction("LOADING");

export const closerVideosIdsLoadedOkAction = closerVideosIdsActionGroup.defineAction<{
    result: CloserVideosIdsState["result"];
}>("LOADED OK");

export const closerVideosIdsLoadedErrorAction = closerVideosIdsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

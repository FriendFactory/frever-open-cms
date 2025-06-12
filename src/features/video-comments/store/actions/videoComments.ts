import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { VideoCommentsQueryParams, VideoComment } from "../../services";

export const videoCommentsActionGroup = defineActionGroup<{
    stage: string;
    params: VideoCommentsQueryParams;
}>("VIDEO COMMENTS");

export const videoCommentsLoadingAction = videoCommentsActionGroup.defineAction("LOADING");

export const videoCommentsLoadedOkAction = videoCommentsActionGroup.defineAction<{
    result: ResultWithCount<VideoComment>;
}>("LOADED: OK");

export const videoCommentsLoadedErrorAction = videoCommentsActionGroup.defineAction<{
    error: string;
}>("LOADED: ERROR");

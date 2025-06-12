import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Video, VideoCommandType, VideoPatchRequest } from "features/video-moderation/services";
import { VideoInfo } from "../../services/getVideoDetails";

export const videoModerationDetailsActionGroup =
    defineActionGroup<{ stage: string; videoId: number }>("VIDEO MODERATION DETAILS");

export const videoModerationDetailsLoadingAction = videoModerationDetailsActionGroup.defineAction("LOADING");

export const videoModerationDetailsLoadedOkAction = videoModerationDetailsActionGroup.defineAction<{
    result: VideoInfo;
}>("LOADED OK");

export const videoModerationDetailsLoadedErrorAction = videoModerationDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const setVideoSoftDeleteAction = videoModerationDetailsActionGroup.defineAction<{
    videoId: number;
    isDeleted: boolean;
    includeRemixes: boolean;
}>("SET SOFT DELETED");

export const executeVideoCommandAction =
    defineAction<{ stage: string; video: Video; command: VideoCommandType }>("EXECUTE VIDEO COMMAND");

export const patchVideoCommandAction =
    videoModerationDetailsActionGroup.defineAction<{ data: VideoPatchRequest }>("PATCH VIDEO COMMAND");

import { defineActionGroup } from "rd-redux-utils";

import {
    GetUserPhotoParams,
    GetUserSoundParams,
    GetUserVideoClipParams,
    UserMediaFileEntity,
    UserMediaFileType
} from "../../services";

export const userMediaFileListActionGroup = defineActionGroup<{
    stage: string;
    mediaFileType: UserMediaFileType;
    params: GetUserPhotoParams | GetUserSoundParams | GetUserVideoClipParams;
}>("USER MEDIA FILE LIST");

export const userMediaFileListLoadingAction = userMediaFileListActionGroup.defineAction("LOADING");

export const userMediaFileListLoadedOkAction = userMediaFileListActionGroup.defineAction<{
    result: UserMediaFileEntity[];
}>("LOADED OK");

export const userMediaFileListLoadedErrorAction = userMediaFileListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

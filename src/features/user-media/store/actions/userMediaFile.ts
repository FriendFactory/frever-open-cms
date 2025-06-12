import { defineActionGroup } from "rd-redux-utils";

import { UserMediaFileEntity, UserMediaFileType } from "../../services";

export const userMediaFileActionGroup =
    defineActionGroup<{ stage: string; mediaFileType: UserMediaFileType; id: number }>("USER MEDIA FILE");

export const userMediaFileLoadingAction = userMediaFileActionGroup.defineAction("LOADING");

export const userMediaFileLoadedOkAction = userMediaFileActionGroup.defineAction<{
    result: UserMediaFileEntity;
}>("LOADED OK");

export const userMediaFileLoadedErrorAction = userMediaFileActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

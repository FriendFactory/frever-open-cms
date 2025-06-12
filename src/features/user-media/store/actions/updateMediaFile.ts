import { defineAction } from "rd-redux-utils";

import { UserMediaFileEntity, UserMediaFileType } from "features/user-media/services";
import { ThumbnailFile } from "shared";

export const updateMediaFileEntityAction = defineAction<{
    stage: string;
    mediaFileType: UserMediaFileType;
    data: Partial<UserMediaFileEntity> & { id: number };
}>("UPDATE USER MEDIA FILE ENTITY");

export const updateMediaFileAction = defineAction<{
    stage: string;
    mediaFileType: UserMediaFileType;
    info: Partial<ThumbnailFile> & { id: number };
    data: File;
}>("UPDATE USER MEDIA FILE");

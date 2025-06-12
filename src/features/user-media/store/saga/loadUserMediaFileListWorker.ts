import { call, put } from "redux-saga/effects";

import {
    getUserPhoto,
    GetUserPhotoParams,
    getUserSound,
    GetUserSoundParams,
    getUserVideoClip,
    GetUserVideoClipParams,
    UserMediaFileEntity,
    UserMediaFileType
} from "../../services";
import { addPopUpMessageAction } from "shared/store";
import {
    userMediaFileListLoadingAction,
    userMediaFileListLoadedOkAction,
    userMediaFileListLoadedErrorAction
} from "../actions";

interface ServiceParamsType {
    VideoClip: GetUserVideoClipParams;
    Photo: GetUserPhotoParams;
    UserSound: GetUserSoundParams;
}

export function* loadUserMediaFileListWorker<T extends UserMediaFileType = UserMediaFileType>(
    stage: string,
    mediaFileType: T,
    params: ServiceParamsType[T]
) {
    try {
        yield put(userMediaFileListLoadingAction({ stage, mediaFileType, params }));

        let result: UserMediaFileEntity[] | undefined;

        if (mediaFileType === "Photo") result = yield call(getUserPhoto, stage, params as GetUserPhotoParams);
        if (mediaFileType === "UserSound") result = yield call(getUserSound, stage, params as GetUserSoundParams);
        if (mediaFileType === "VideoClip")
            result = yield call(getUserVideoClip, stage, params as GetUserVideoClipParams);

        if (result) {
            yield put(
                userMediaFileListLoadedOkAction({
                    stage,
                    mediaFileType,
                    params,
                    result
                })
            );
        } else {
            throw new Error("Internal loadUserMediaFileListWorker error");
        }
    } catch (responseError) {
        yield put(
            userMediaFileListLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                mediaFileType,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load ${mediaFileType} list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

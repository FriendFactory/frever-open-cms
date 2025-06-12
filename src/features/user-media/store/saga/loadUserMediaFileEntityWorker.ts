import { call, put } from "redux-saga/effects";

import { UserMediaFileEntity, UserMediaFileType } from "../../services";
import { userMediaFileLoadingAction, userMediaFileLoadedOkAction, userMediaFileLoadedErrorAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { getEntityById } from "shared";

export function* loadUserMediaFileEntityWorker(stage: string, mediaFileType: UserMediaFileType, id: number) {
    try {
        yield put(userMediaFileLoadingAction({ stage, mediaFileType, id }));

        const result: UserMediaFileEntity = yield call(getEntityById, stage, mediaFileType, id);

        yield put(
            userMediaFileLoadedOkAction({
                stage,
                mediaFileType,
                id,
                result
            })
        );
    } catch (responseError) {
        yield put(
            userMediaFileLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                mediaFileType,
                id
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load ${mediaFileType} details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

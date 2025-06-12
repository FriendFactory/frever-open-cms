import { call, put, takeEvery } from "redux-saga/effects";

import { postEntity, initUpload, InitUpload, ThumbnailFile, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { SeasonEntity, SeasonEntityPathToFieldName, SeasonInfo } from "features/seasons-moderation/services";
import { postSeasonEntityAction, seasonDetailsLoadedOkAction } from "../actions";
import { FileExtensions } from "config";

export function* watchPostSeasonEntitySaga() {
    yield takeEvery(postSeasonEntityAction.TYPE, function* (action: typeof postSeasonEntityAction.typeOf.action) {
        try {
            const data: SeasonEntity & { files?: ThumbnailFile[] } = { ...action.data };

            if (action.thumbnail) {
                const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, action.stage);

                yield call(uploadFile, uploadUrl, action.thumbnail);

                data.files = [createSeasonThumbnailFile(uploadId)];
            }

            const result: SeasonInfo = yield call(
                postEntity,
                action.stage,
                SeasonEntityPathToFieldName[action.entityName],
                data
            );

            yield put(
                seasonDetailsLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed To POST ${action.entityName}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

const createSeasonThumbnailFile = (uploadId: string): ThumbnailFile => ({
    file: 1,
    extension: FileExtensions.Png,
    resolution: "512x512",
    version: null,
    source: {
        uploadId
    }
});

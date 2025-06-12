import { call, put, takeEvery } from "redux-saga/effects";

import { characterDetailsLoadedOkAction, updateCharaThumbAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { InitUpload, initUpload, ThumbnailFile, uploadFile } from "shared";
import { Character } from "features/user-moderation/services";
import { editCharacter } from "features/search-characters/services";

export function* watchUpdateThumbnailSaga() {
    yield takeEvery(updateCharaThumbAction.TYPE, function* (action: typeof updateCharaThumbAction.typeOf.action) {
        try {
            const { uploadUrl, uploadId }: InitUpload = yield call(initUpload, action.stage);

            yield call(uploadFile, uploadUrl, action.file);

            const newImageFile: ThumbnailFile = {
                file: 1,
                extension: action.data.extension,
                resolution: action.data.resolution,
                version: null,
                source: {
                    uploadId
                }
            };

            const result: Character = yield call(editCharacter, action.stage, {
                id: action.data.id,
                files: [newImageFile]
            });

            yield put(
                characterDetailsLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update character thumbnail. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

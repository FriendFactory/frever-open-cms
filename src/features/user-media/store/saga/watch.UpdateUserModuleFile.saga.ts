import { call, put, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { initUpload, InitUpload, uploadFile } from "shared";
import { updateMediaFileAction, updateMediaFileEntityAction } from "../actions";
import { UserMediaFile } from "features/user-media/services";

export function* watchUpdateUserModuleFileSaga() {
    yield takeEvery(updateMediaFileAction.TYPE, function* (action: typeof updateMediaFileAction.typeOf.action) {
        const { stage, mediaFileType, info, data } = action;
        try {
            const { uploadUrl, uploadId }: InitUpload = yield call(initUpload, action.stage);
            yield put(
                addPopUpMessageAction({
                    messageText: "Please wait ... Uploading the file to the server.",
                    messageStyle: "loading",
                    key: "UpdateUserMediaFile",
                    duration: 0
                })
            );

            yield call(uploadFile, uploadUrl, data);

            yield put(
                addPopUpMessageAction({
                    messageText: "A new file was uploaded successfully.",
                    messageStyle: "success",
                    key: "UpdateUserMediaFile"
                })
            );

            const newImageFile = {
                file: 0,
                extension: action.info.extension,
                resolution: action.info.resolution,
                version: null,
                source: {
                    uploadId
                }
            };

            yield put(
                updateMediaFileEntityAction({
                    stage,
                    mediaFileType,
                    data: {
                        id: info.id,
                        files: [newImageFile] as unknown as UserMediaFile[]
                    }
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update ${mediaFileType} file. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

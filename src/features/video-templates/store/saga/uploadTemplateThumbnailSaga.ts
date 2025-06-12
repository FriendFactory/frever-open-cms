import { call, put } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { InitUpload, initUpload, uploadFile } from "shared";

export function* uploadTemplateThumbnailSaga(stage: string, file: File) {
    try {
        const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

        yield call(uploadFile, uploadUrl, file);

        return uploadId;
    } catch (responseError) {
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to update the template thumbnail. An error occurred while attempting to update the template thumbnail. ${(
                    responseError as Error
                ).toString()}`,
                messageStyle: "error"
            })
        );
        return;
    }
}

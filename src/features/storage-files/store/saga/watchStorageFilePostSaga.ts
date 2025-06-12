import { call, put, takeEvery } from "redux-saga/effects";

import { postEntity, initUpload, InitUpload, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { storageFilePostAction } from "../actions";
import { storageFileListPageWorker } from "./watchStorageFileListSaga";

export function* watchStorageFilePostSaga() {
    yield takeEvery(storageFilePostAction.TYPE, function* (action: typeof storageFilePostAction.typeOf.action) {
        try {
            const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, action.stage);
            yield call(uploadFile, uploadUrl, action.file);

            const data: any = { ...action.data, uploadId };
            yield call(postEntity, action.stage, "storage-file/moderation", data);

            yield* storageFileListPageWorker(location);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to post storage file. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

import { call, put, takeEvery } from "redux-saga/effects";

import { updateCrewInfo } from "features/crews-moderation/services";
import { updateCrewAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";
import { FileExtensions } from "config";
import { InitUpload, initUpload, uploadFile } from "shared";
import { loadCrewsList } from "./watchCrewsListSaga";

export function* updateCrewInfoSaga() {
    yield takeEvery(updateCrewAction.TYPE, function* (action: typeof updateCrewAction.typeOf.action) {
        const { stage, data, file } = action;

        const key = `crew/${data.id}`;

        try {
            yield put(
                addPopUpMessageAction({
                    messageText: "Pending...",
                    messageStyle: "loading",
                    duration: 0,
                    key
                })
            );

            if (file) {
                const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

                yield call(uploadFile, uploadUrl, file);

                data.files = [createThumbnailFile(uploadId)];
            }

            yield call(updateCrewInfo, stage, data);

            yield* loadCrewsList(stage, { id: data.id });

            yield put(
                addPopUpMessageAction({
                    messageText: `${data.name} updated OK.`,
                    messageStyle: "success",
                    key
                })
            );
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update crew. ${(e as Error).message}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

export const createThumbnailFile = (uploadId: string): any => ({
    file: 0,
    extension: FileExtensions.Jpeg,
    version: null,
    source: { uploadId }
});

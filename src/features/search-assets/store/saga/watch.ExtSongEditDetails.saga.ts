import { call, put, takeEvery } from "redux-saga/effects";

import { externalSongEditAction, externalSongLoadedOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";

import { editAssetDetails, ExternalSong } from "../../services";

export function* watchExtSongEditDetailsSaga() {
    yield takeEvery(externalSongEditAction.TYPE, function* (action: typeof externalSongEditAction.typeOf.action) {
        try {
            const result: ExternalSong = yield call(editAssetDetails, action.stage, "ExternalSong", {
                id: action.id,
                ...action.data
            });

            yield put(
                externalSongLoadedOkAction({
                    stage: action.stage,
                    id: action.id,
                    result
                })
            );

            if (action.data.isDeleted === undefined) {
                yield put(
                    addPopUpMessageAction({
                        messageText: "Update success",
                        messageStyle: "success"
                    })
                );
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to edit the Asset. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

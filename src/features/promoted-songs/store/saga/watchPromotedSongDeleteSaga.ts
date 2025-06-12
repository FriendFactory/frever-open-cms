import { call, put, takeEvery } from "redux-saga/effects";

import { deleteEntity } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { promotedSongDeleteAction } from "../actions";
import { promotedSongListPageWorker } from "./watchPromotedSongListSaga";

export function* watchPromotedSongDeleteSaga() {
    yield takeEvery(promotedSongDeleteAction.TYPE, function* (action: typeof promotedSongDeleteAction.typeOf.action) {
        try {
            yield call(deleteEntity, action.stage, "StorageFile", action.id);

            yield* promotedSongListPageWorker(location);
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to delete storage file. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

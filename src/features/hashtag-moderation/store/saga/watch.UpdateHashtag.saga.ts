import { call, put, takeEvery } from "redux-saga/effects";

import { Hashtag, updateHashtag } from "features/hashtag-moderation/services";
import { updateHashtagAction, updateHashtagOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";

export function* watchUpdateHashtagSaga() {
    yield takeEvery(updateHashtagAction.TYPE, function* (action: typeof updateHashtagAction.typeOf.action) {
        try {
            const result: Hashtag = yield call(updateHashtag, action.stage, action.id, action.data);

            yield put(updateHashtagOkAction({ stage: action.stage, result }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Hashtag update. Success.",
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Hashtag update. Failed. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

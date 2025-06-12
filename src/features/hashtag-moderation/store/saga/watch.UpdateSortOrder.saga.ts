import { all, call, put, takeEvery } from "redux-saga/effects";

import { Hashtag, updateHashtag } from "features/hashtag-moderation/services";
import { updateSortOrderAction, updateSortOrderOkAction } from "../actions";
import { addPopUpMessageAction } from "shared/store";

export function* watchUpdateSortOrderSaga() {
    yield takeEvery(updateSortOrderAction.TYPE, function* (action: typeof updateSortOrderAction.typeOf.action) {
        try {
            const result: Hashtag[] = yield all(
                action.data.map(function* (hashtag) {
                    const updatedHashtag: Hashtag = yield call(updateHashtag, action.stage, hashtag.id, {
                        challengeSortOrder: hashtag.challengeSortOrder
                    });
                    return updatedHashtag;
                })
            );

            yield put(updateSortOrderOkAction({ stage: action.stage, result }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Sorting order update. Success.",
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Sorting order update. Failed. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

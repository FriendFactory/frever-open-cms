import { spawn, call, put, takeEvery } from "redux-saga/effects";

import { deleteHashtag } from "features/hashtag-moderation/services";
import { deleteHashtagAction } from "../actions";
import { loadHashtagList } from "./watch.HashtagList.saga";
import { addPopUpMessageAction } from "shared/store";
import { HASHTAG_LIST_PAGE_URL } from "urls";

export function* watchDeleteHashtagSaga() {
    yield takeEvery(deleteHashtagAction.TYPE, function* (action: typeof deleteHashtagAction.typeOf.action) {
        try {
            yield call(deleteHashtag, action.stage, action.id);

            yield put(
                addPopUpMessageAction({
                    messageText: "Delete hashtag. Success.",
                    messageStyle: "success"
                })
            );

            const urlMatchListPage = HASHTAG_LIST_PAGE_URL.match(location, true);
            if (urlMatchListPage.isMatched) {
                yield spawn(loadHashtagList, {
                    stage: urlMatchListPage.params.stage,
                    params: urlMatchListPage.query ?? {}
                });
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Delete hashtag. Failed. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { StarCreatorCode, creatorCodeUpsert } from "../../services";
import { creatorCodeUpsertAction, creatorCodeUpsertFinishedAction } from "../actions/creatorCodes";
import { CREATOR_CODES_LIST_PAGE } from "urls";
import { loadCreatorCodesList } from "./watchCreatorCodesListSaga";

export function* watchCreatorCodeUpsertSaga() {
    yield takeEvery(creatorCodeUpsertAction.TYPE, function* (action: typeof creatorCodeUpsertAction.typeOf.action) {
        try {
            const data: StarCreatorCode = yield call(creatorCodeUpsert, action.stage, action.data);

            yield put(creatorCodeUpsertFinishedAction({ stage: action.stage, data }));

            yield put(
                addPopUpMessageAction({
                    messageText: "Success. Star Creator Code created/updated",
                    messageStyle: "success"
                })
            );

            const urlMatch = CREATOR_CODES_LIST_PAGE.match(location, true);
            if (urlMatch.isMatched) yield spawn(loadCreatorCodesList, urlMatch.params.stage, urlMatch.query || {});
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update star creator code. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

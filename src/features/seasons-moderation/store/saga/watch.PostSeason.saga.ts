import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { postEntity } from "shared";
import { postSeasonAction, seasonDetailsLoadedOkAction } from "../actions";
import { SeasonInfo } from "features/seasons-moderation/services";
import { SEASON_LIST_PAGE_URL } from "urls";
import { loadSeasonList } from "./watch.SeasonList.saga";

export function* watchPostSeasonSaga() {
    yield takeEvery(postSeasonAction.TYPE, function* (action: typeof postSeasonAction.typeOf.action) {
        try {
            yield put(
                addPopUpMessageAction({
                    messageStyle: "loading",
                    messageText: "Pending..."
                })
            );

            const result: SeasonInfo = yield call(postEntity, action.stage, "season", action.data);

            yield put(
                seasonDetailsLoadedOkAction({
                    stage: action.stage,
                    id: result.id,
                    result
                })
            );

            const urlMatch = SEASON_LIST_PAGE_URL.match(location, true);
            if (urlMatch.isMatched) yield spawn(loadSeasonList, urlMatch.params.stage, urlMatch.query || {});

            yield put(
                addPopUpMessageAction({
                    messageText: `Season has been created/updated`,
                    messageStyle: "success"
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to create/update Season. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { copySeason } from "features/seasons-moderation/services";

import { addPopUpMessageAction } from "shared/store";
import { copySeasonEntityAction } from "../actions";
import { SEASON_LIST_PAGE_URL, SEASON_DETAILS_PAGE_URL } from "urls";
import { loadSeasonList } from "./watch.SeasonList.saga";
import { SeasonInfo } from "../../services/api";

export function* watchCopySeasonSaga() {
    yield takeEvery(copySeasonEntityAction.TYPE, function* (action: typeof copySeasonEntityAction.typeOf.action) {
        const { stage, data } = action;

        try {
            const season: SeasonInfo = yield call(copySeason, stage, data);

            const urlListPage = SEASON_LIST_PAGE_URL.match(location, true);
            if (urlListPage.isMatched) yield spawn(loadSeasonList, urlListPage.params.stage, urlListPage.query || {});

            yield put(
                addPopUpMessageAction({
                    messageText: `Season copied success.`,
                    messageStyle: "success",
                    link: SEASON_DETAILS_PAGE_URL.format({ stage: action.stage, id: season.id })
                })
            );
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to copy season. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

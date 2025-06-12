import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { getSeasonList, SeasonBaseInfo, SeasonListQueryParams } from "../../services";
import { SEASON_LIST_PAGE_URL } from "urls";
import { seasonListLoadingAction, seasonListLoadedOkAction, seasonListLoadedErrorAction } from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchSeasonListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = SEASON_LIST_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Seasons");
        if (!hasAccess) return;

        const {
            params: { stage },
            query: params = {}
        } = urlMatch;

        yield* loadSeasonList(stage, params);
    });
}

export function* loadSeasonList(stage: string, params: SeasonListQueryParams) {
    try {
        yield put(seasonListLoadingAction({ stage, params }));

        const result: ResultWithCount<SeasonBaseInfo> = yield call(getSeasonList, stage, params);

        yield put(
            seasonListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            seasonListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the season list. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

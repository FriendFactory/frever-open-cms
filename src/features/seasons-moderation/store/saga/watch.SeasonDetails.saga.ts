import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { getEntityById } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { SeasonInfo } from "../../services";
import { SEASON_DETAILS_PAGE_URL } from "urls";
import { seasonDetailsLoadingAction, seasonDetailsLoadedOkAction, seasonDetailsLoadedErrorAction } from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchSeasonDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = SEASON_DETAILS_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Seasons");
        if (!hasAccess) return;

        const { stage, id } = urlMatch.params;

        yield spawn(loadSeasonDetails, stage, id);
    });
}

export function* loadSeasonDetails(stage: string, id: number) {
    try {
        yield put(seasonDetailsLoadingAction({ stage, id }));

        const result: SeasonInfo = yield call(getEntityById, stage, "season", id);

        yield put(
            seasonDetailsLoadedOkAction({
                stage,
                id,
                result
            })
        );
    } catch (responseError) {
        yield put(
            seasonDetailsLoadedErrorAction({
                error: (responseError as Error).toString(),
                stage,
                id
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load the season details. ${(responseError as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

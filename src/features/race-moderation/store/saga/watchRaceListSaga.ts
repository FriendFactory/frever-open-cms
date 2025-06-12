import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { RACE_LIST_URL } from "urls";
import { addPopUpMessageAction } from "shared/store";
import { ResultWithCount } from "shared";
import {
    raceListLoadingAction,
    raceListLoadedOkAction,
    raceListLoadedErrorAction,
    raceListLoadAction
} from "../actions/raceListActions";
import { Race, RaceListQueryParams, getRaceList } from "features/race-moderation/services";

export function* watchRaceListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = RACE_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        yield spawn(loadRaceList, urlMatch.params.stage, urlMatch.query || {});
    });

    yield takeEvery(raceListLoadAction.TYPE, function* (action: typeof raceListLoadAction.typeOf.action) {
        yield spawn(loadRaceList, action.stage, action.params);
    });
}

export function* loadRaceList(stage: string, params: RaceListQueryParams) {
    try {
        yield put(raceListLoadingAction({ stage, params }));

        const { data, count }: ResultWithCount<Race> = yield call(getRaceList, stage, params);

        yield put(raceListLoadedOkAction({ stage, params, data, total: count }));
    } catch (error) {
        yield put(
            raceListLoadedErrorAction({
                stage,
                params,
                error: (error as Error).toString()
            })
        );
        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load Race list. ${(error as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

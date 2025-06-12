import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, fork, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";

import { CREW_REWARDS_LIST_URL } from "urls";
import {
    crewRewardsListLoadingAction,
    crewRewardsListLoadedOkAction,
    crewRewardsListLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";
import { CrewRewards, CrewRewardsQueryParams, getCrewRewards } from "../../services";

export function* watchCrewRewardsListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREW_REWARDS_LIST_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");

        if (!hasAccess) return;

        const {
            params: { stage },
            query: params = {}
        } = urlMatch;

        yield fork(loadCrewRewardsList, stage, params);
    });
}

export function* loadCrewRewardsList(stage: string, params: CrewRewardsQueryParams) {
    try {
        yield put(crewRewardsListLoadingAction({ stage, params }));

        const result: ResultWithCount<CrewRewards> = yield call(getCrewRewards, stage, params);

        yield put(
            crewRewardsListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (responseError) {
        yield put(
            crewRewardsListLoadedErrorAction({
                error: (responseError as Error).toString(),
                params,
                stage
            })
        );
    }
}

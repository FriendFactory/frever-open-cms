import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { CREATOR_CANDIDATE_LIST_URL } from "urls";
import {
    creatorCandidateListLoadingAction,
    creatorCandidateListLoadedOkAction,
    creatorCandidateListLoadedErrorAction
} from "../actions";
import {
    CreatorCandidatesQueryParams,
    getStarCreatorCandidates,
    StarCreatorCandidate
} from "features/creator-candidates/services";
import { checkUserAccess } from "shared/checkUserAccess";

export function* watchCreatorCandidateListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREATOR_CANDIDATE_LIST_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadStarCreatorCandidates, urlMatch.params.stage, urlMatch.query || {});
    });
}

export function* loadStarCreatorCandidates(stage: string, params: CreatorCandidatesQueryParams) {
    try {
        yield put(creatorCandidateListLoadingAction({ stage, params }));

        const result: StarCreatorCandidate[] = yield call(getStarCreatorCandidates, stage, params);

        yield put(
            creatorCandidateListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            creatorCandidateListLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );

        yield put(
            addPopUpMessageAction({
                messageText: `Failed to load creator candidate list. ${(e as Error).toString()}`,
                messageStyle: "error"
            })
        );
    }
}

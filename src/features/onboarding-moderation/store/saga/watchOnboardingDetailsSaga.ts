import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, fork, spawn, takeEvery } from "redux-saga/effects";

import { ONBOARDING_DETAILS_PAGE_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import { loadQuestGroupList, loadQuestList, loadRewardList } from "./watchLoadOnboardingEntities";

export function* watchOnboardingDetailsSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = ONBOARDING_DETAILS_PAGE_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Seasons");
        if (!hasAccess) return;

        const { stage, id: onboardingQuestGroupId } = urlMatch.params;

        yield fork(loadQuestGroupList, stage, { id: onboardingQuestGroupId });
        yield spawn(loadQuestList, stage, { onboardingQuestGroupId });
        yield spawn(loadRewardList, stage, { onboardingQuestGroupId });
    });
}

import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { call, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { ONBOARDING_QUEST_GROUP_LIST_PAGE_URL } from "urls";
import { loadQuestGroupList } from "./watchLoadOnboardingEntities";

export function* watchOnboardingListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = ONBOARDING_QUEST_GROUP_LIST_PAGE_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Seasons");
        if (!hasAccess) return;

        const { stage, params } = { stage: urlMatch.params.stage, params: urlMatch.query || {} };

        yield call(loadQuestGroupList, stage, params);
    });
}

import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { call, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { CHAT_HISTORY_PAGE_URL, CREW_DETAILS_PAGE_URL } from "urls";
import { loadCrewsList } from "./watchCrewsListSaga";

export function* watchLoadCrewInfoSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CREW_DETAILS_PAGE_URL.match(action.payload.location, true);
        const chatHistoryUrlMatch = CHAT_HISTORY_PAGE_URL.match(action.payload.location, true);

        if (!urlMatch.isMatched && !chatHistoryUrlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        if (chatHistoryUrlMatch.isMatched) {
            yield spawn(loadCrewsList, chatHistoryUrlMatch.params.stage, { chatId: chatHistoryUrlMatch.params.chatId });
        }

        if (urlMatch.isMatched) {
            yield spawn(loadCrewsList, urlMatch.params.stage, { id: urlMatch.params.id });
        }
    });
}

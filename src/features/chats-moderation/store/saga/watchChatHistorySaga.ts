import { call, spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { CHAT_HISTORY_PAGE_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import { loadChatMessagesSaga } from "./loadChatMessagesSaga";

export function* watchChatHistorySaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHAT_HISTORY_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadChatMessagesSaga, urlMatch.params.stage, urlMatch.params.chatId, urlMatch.query);
    });
}

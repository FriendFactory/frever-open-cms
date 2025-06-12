import { call, put, spawn, takeEvery } from "redux-saga/effects";
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";

import { CHATS_MESSAGES_SEARCH_PAGE_URL } from "urls";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    chatMessagesSearchLoadingAction,
    chatMessagesSearchLoadedOkAction,
    chatMessagesSearchLoadedErrorAction
} from "../actions";
import { ChatMessageSearch, ChatMessageSearchListQueryParams } from "features/chats-moderation";
import { getMessagesSearchList } from "features/chats-moderation/services";

export function* watchChatMessagesSearchSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = CHATS_MESSAGES_SEARCH_PAGE_URL.match(action.payload.location, true);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadChatMessagesSearchListSaga, urlMatch.params.stage, urlMatch.query || {});
    });
}

function* loadChatMessagesSearchListSaga(stage: string, params: ChatMessageSearchListQueryParams) {
    try {
        yield put(chatMessagesSearchLoadingAction({ stage, params }));

        const data: ChatMessageSearch[] = yield call(getMessagesSearchList, stage, params);

        yield put(chatMessagesSearchLoadedOkAction({ stage, params, data }));
    } catch (e) {
        yield put(
            chatMessagesSearchLoadedErrorAction({
                stage,
                params,
                error: `Failed to load chat messages. ${(e as Error).message}`
            })
        );
    }
}

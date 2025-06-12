import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { ChatMessage, ChatQueryParams, getChatMessages } from "features/chats-moderation/services";
import {
    chatMessagesLoadAction,
    chatMessagesLoadingAction,
    chatMessagesLoadedOkAction,
    chatMessagesLoadedErrorAction
} from "../actions";

export function* watchLoadChatMessagesSaga() {
    yield takeEvery(chatMessagesLoadAction.TYPE, function* (action: typeof chatMessagesLoadAction.typeOf.action) {
        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        yield spawn(loadChatMessagesSaga, action.stage, action.chatId, action.params);
    });
}

export function* loadChatMessagesSaga(stage: string, chatId: number, params: ChatQueryParams = {}) {
    try {
        yield put(chatMessagesLoadingAction({ stage, chatId }));

        const result: ChatMessage[] = yield call(getChatMessages, stage, chatId, params);

        const count = result.length;

        const hasPrev = !params.target ? false : hasMore(params.takeNewer ?? 0, count);
        const hasNext = hasMore(params.takeOlder ?? 0, count);

        yield put(chatMessagesLoadedOkAction({ stage, chatId, result, hasPrev, hasNext }));
    } catch (e) {
        yield put(chatMessagesLoadedErrorAction({ stage, chatId, error: (e as Error).message }));
    }
}

const hasMore = (count: number, value: number) => count < value + 1;

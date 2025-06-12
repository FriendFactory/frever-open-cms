import { all, call, put, spawn, takeEvery } from "redux-saga/effects";

import {
    inboxListLoadAction,
    inboxListLoadedErrorAction,
    inboxListLoadedOkAction,
    inboxListLoadingAction
} from "../actions/inboxList";
import { InboxListQueryParams, getInboxList } from "features/community-moderation/services/getInboxList";
import { InboxInfo } from "features/community-moderation/services/api";
import { ChatMessage, getChatMessages } from "features/chats-moderation/services";

export function* watchInboxListSaga() {
    yield takeEvery(inboxListLoadAction.TYPE, function* (action: typeof inboxListLoadAction.typeOf.action) {
        yield spawn(loadInboxListSaga, action.stage, action.params);
    });
}

function* loadInboxListSaga(stage: string, params: InboxListQueryParams) {
    try {
        yield put(inboxListLoadingAction({ stage, params }));

        const inboxInfo: InboxInfo[] = yield call(getInboxList, stage, params);

        const data: InboxInfo[] = yield all(
            inboxInfo.map(function* (inbox) {
                const chatMessages: ChatMessage[] = yield call(
                    getChatMessages,
                    stage,
                    inbox.id,
                    inbox.lastReadMessageId
                        ? {
                              target: inbox.lastReadMessageId,
                              takeOlder: 0
                          }
                        : {},
                    true
                );

                return {
                    ...inbox,
                    totalUnreadMessages: chatMessages.length
                };
            })
        );

        yield put(inboxListLoadedOkAction({ stage, params, data }));
    } catch (e) {
        yield put(
            inboxListLoadedErrorAction({ stage, params, error: `Failed to load inbox list. ${(e as Error).message}` })
        );
    }
}

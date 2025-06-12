import { all } from "redux-saga/effects";

import { watchInboxListSaga } from "./watchInboxListSaga";
import { watchChatConversationSaga } from "./watchChatConversationSaga";
import { watchScheduledMessageListSaga } from "./watchScheduledMessageListSaga";
import { watchDeleteScheduledMessageSaga } from "./watchDeleteScheduledMessageSaga";
import { watchUpsertScheduledMessageSaga } from "./watchUpsertScheduledMessageSaga";
import { watchScheduledMessageDetailsSaga } from "./watchScheduledMessageDetailsSaga";

export function* communityChatSaga() {
    yield all([watchInboxListSaga(), watchChatConversationSaga()]);
}

export function* scheduledMessagesSaga() {
    yield all([
        watchScheduledMessageListSaga(),
        watchScheduledMessageDetailsSaga(),
        watchDeleteScheduledMessageSaga(),
        watchUpsertScheduledMessageSaga()
    ]);
}

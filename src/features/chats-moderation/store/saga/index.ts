import { all } from "redux-saga/effects";

import { watchLoadChatMessagesSaga } from "./loadChatMessagesSaga";
import { executeMessagesCommandSaga } from "./executeMessagesCommandSaga";
import { watchChatHistorySaga } from "./watchChatHistorySaga";
import { watchChatsListSaga } from "./watchChatsListSaga";
import { watchChatMessagesSearchSaga } from "./watchChatMessagesSearchSaga";

export function* chatsSaga() {
    yield all([
        watchLoadChatMessagesSaga(),
        executeMessagesCommandSaga(),
        watchChatHistorySaga(),
        watchChatsListSaga(),
        watchChatMessagesSearchSaga()
    ]);
}

import { call, put, takeEvery } from "redux-saga/effects";

import { ChatMessage, getChatMessages, setMessageIsDeleted } from "features/chats-moderation/services";
import { executeMessageCommandAction, updateChatMessageAction } from "../actions";

export function* executeMessagesCommandSaga() {
    yield takeEvery(
        executeMessageCommandAction.TYPE,
        function* (action: typeof executeMessageCommandAction.typeOf.action) {
            const { stage, chatId, command } = action;

            yield call(setMessageIsDeleted, stage, command.messageId, command.isDeleted);

            const result: ChatMessage[] = yield call(getChatMessages, stage, chatId, {
                target: command.messageId
            });

            const message = result[0];

            if (message) yield put(updateChatMessageAction({ stage, chatId, message }));
        }
    );
}

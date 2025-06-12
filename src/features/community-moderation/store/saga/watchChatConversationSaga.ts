import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { checkUserAccess } from "shared/checkUserAccess";
import { ChatConversationMessage, InboxInfo } from "features/community-moderation/services/api";
import {
    ChatConversationQueryParams,
    getChatConversation
} from "features/community-moderation/services/getChatConversation";
import {
    chatConversationLoadAction,
    chatConversationLoadedErrorAction,
    chatConversationLoadedOkAction,
    chatConversationLoadingAction,
    chatConversationSendMessage
} from "../actions/chatConversation";
import { getInboxList } from "features/community-moderation/services/getInboxList";
import { sendMessageSaga } from "./sendMessageSaga";

export function* watchChatConversationSaga() {
    yield takeEvery(
        chatConversationLoadAction.TYPE,
        function* (action: typeof chatConversationLoadAction.typeOf.action) {
            const hasAccess: boolean = yield call(checkUserAccess, "ChatMessageSending");
            if (!hasAccess) return;

            yield spawn(loadChatConversationSaga, action.stage, action.chatId, action.params);
        }
    );
    yield takeEvery(
        chatConversationSendMessage.TYPE,
        function* (action: typeof chatConversationSendMessage.typeOf.action) {
            yield call(sendMessageSaga, action.stage, action.chatId, action.data);
            yield call(loadChatConversationSaga, action.stage, action.chatId, {});
        }
    );
}

export function* loadChatConversationSaga(stage: string, chatId: number, params: ChatConversationQueryParams = {}) {
    try {
        yield put(chatConversationLoadingAction({ stage, chatId }));

        const lastReadMessageId: number | undefined = yield call(checkLastReadMessageId, stage, chatId);

        let result: ChatConversationMessage[] = yield call(getChatConversation, stage, chatId, params);

        if (params.unreadOnly && lastReadMessageId) {
            result = filterUnreadMessages(lastReadMessageId, result);
        }

        yield put(chatConversationLoadedOkAction({ stage, chatId, result, lastReadMessageId }));
    } catch (e) {
        yield put(chatConversationLoadedErrorAction({ stage, chatId, error: (e as Error).message }));
    }
}

const cachedLastReadMessageId = new Map<number, number | undefined | null>();

function* checkLastReadMessageId(stage: string, chatId: number) {
    let lastReadMessageId = cachedLastReadMessageId.get(chatId);

    if (!cachedLastReadMessageId.has(chatId)) {
        cachedLastReadMessageId.clear();
        const inboxList: InboxInfo[] = yield call(getInboxList, stage, {});
        const chatInfo = inboxList.find((inboxItem) => inboxItem.id === +chatId);

        lastReadMessageId = chatInfo?.lastReadMessageId;
        cachedLastReadMessageId.set(chatId, lastReadMessageId);
    }

    return lastReadMessageId;
}

const filterUnreadMessages = (lastReadMessageId: number, messages: ChatConversationMessage[]) => {
    return messages.filter((message) => message.id > lastReadMessageId);
};

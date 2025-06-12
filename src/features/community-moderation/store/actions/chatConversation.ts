import { defineActionGroup } from "rd-redux-utils";

import { ChatConversationMessage } from "features/community-moderation/services/api";
import { ChatConversationQueryParams } from "features/community-moderation/services/getChatConversation";
import { SendMessageFormData } from "features/community-moderation/components/SendMessage/SendMessageForm";

export const chatConversationActionGroup =
    defineActionGroup<{ stage: string; chatId: number }>("CHAT CONVERSATION MESSAGES");

export const chatConversationLoadingAction = chatConversationActionGroup.defineAction("LOADING");

export const chatConversationLoadedOkAction =
    chatConversationActionGroup.defineAction<{ result: ChatConversationMessage[]; lastReadMessageId?: number }>(
        "LOADED OK"
    );

export const chatConversationLoadedErrorAction =
    chatConversationActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const chatConversationLoadAction =
    chatConversationActionGroup.defineAction<{ params?: ChatConversationQueryParams }>("LOAD");

export const chatConversationSendMessage =
    chatConversationActionGroup.defineAction<{ data: SendMessageFormData }>("SEND MESSAGE");

import { defineAction, defineActionGroup } from "rd-redux-utils";

import {
    ChatMessage,
    ChatMessageSearch,
    ChatMessageSearchListQueryParams,
    ChatQueryParams
} from "features/chats-moderation";

export const chatMessagesActionGroup = defineActionGroup<{ stage: string; chatId: number }>("CHAT MESSAGES");

export const chatMessagesLoadAction = chatMessagesActionGroup.defineAction<{ params?: ChatQueryParams }>("LOAD");

export const chatMessagesLoadingAction = chatMessagesActionGroup.defineAction("LOADING");

export const chatMessagesLoadedOkAction =
    chatMessagesActionGroup.defineAction<{ result: ChatMessage[]; hasNext: boolean; hasPrev: boolean }>("LOADED OK");

export const chatMessagesLoadedErrorAction = chatMessagesActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const executeMessageCommandAction = defineAction<{
    stage: string;
    chatId: number;
    command: { type: "change-status"; messageId: number; isDeleted: boolean };
}>("EXECUTE CHAT MESSAGE COMMAND");

export const updateChatMessageAction =
    chatMessagesActionGroup.defineAction<{ message: ChatMessage }>("UPDATE CHAT MESSAGE");

export const chatMessagesSearchActionGroup =
    defineActionGroup<{ stage: string; params: ChatMessageSearchListQueryParams }>("MESSAGES SEARCH");

export const chatMessagesSearchLoadingAction = chatMessagesSearchActionGroup.defineAction("LOADING");

export const chatMessagesSearchLoadedOkAction =
    chatMessagesSearchActionGroup.defineAction<{ data: ChatMessageSearch[] }>("LOADED OK");

export const chatMessagesSearchLoadedErrorAction =
    chatMessagesSearchActionGroup.defineAction<{ error: string }>("LOADED ERROR");

import { BASE_PAGE_URL } from "./baseURL";
import { ChatListQueryParams, ChatMessageSearchListQueryParams, ChatQueryParams } from "features/chats-moderation";

export const CHATS_BASE_URL = BASE_PAGE_URL.createChildPath("chats");
export const CHATS_LIST_PAGE_URL = CHATS_BASE_URL.createChildPath<{}, ChatListQueryParams>("list");
export const CHAT_HISTORY_PAGE_URL = CHATS_BASE_URL.createChildPath<{ chatId: number }, ChatQueryParams>(
    "chat-history/:chatId"
);

export const CHATS_MESSAGES_SEARCH_PAGE_URL = CHATS_BASE_URL.createChildPath<{}, ChatMessageSearchListQueryParams>(
    "search-messages"
);

export const CHAT_HISTORY_LIST_BASE_PAGE_SIZE = 100;
export const CHAT_LIST_BASE_PAGE_SIZE = 100;
export const CHAT_MESSAGES_SEARCH_SIZE = 100;

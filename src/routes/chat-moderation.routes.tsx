import React from "react";
import { Route } from "react-router";

import { ChatHistoryPage, ChatsMessagesSearchListPage, ChatsListPage, ReportedChatMessageListPage } from "pages";
import { renderProtectedPageElement } from "shared";
import {
    CHATS_MESSAGES_SEARCH_PAGE_URL,
    CHATS_LIST_PAGE_URL,
    CHAT_HISTORY_PAGE_URL,
    REPORTED_CHAT_MESSAGE_LIST_URL
} from "urls";

export const ChatModerationRoutes = [
    <Route
        key="chat-history-page"
        path={CHAT_HISTORY_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", ChatHistoryPage)}
    />,
    ,
    <Route
        key="all-chats-list-page"
        path={CHATS_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", ChatsListPage)}
    />,
    <Route
        key="reported-chat-message-list-page"
        path={REPORTED_CHAT_MESSAGE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Social", ReportedChatMessageListPage)}
    />,
    <Route
        key="messages-search-list-page"
        path={CHATS_MESSAGES_SEARCH_PAGE_URL.urlTemplate}
        render={ChatsMessagesSearchListPage}
    />
];

import React from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { List } from "antd";

import { CHAT_HISTORY_PAGE_URL } from "urls";
import {
    ChatMessageSearch,
    ChatMessageSearchListQueryParams,
    messagesSearchListPageSelector
} from "features/chats-moderation";
import { ChatsMessageSearchListItem } from "features/chats-moderation/components/ChatMessageSearch/ChatsMessageSearchListItem";

interface ChatsMessageSearchListContainerProps {
    stage: string;
    params?: ChatMessageSearchListQueryParams;
}

export function ChatsMessageSearchListContainer({ stage, params }: ChatsMessageSearchListContainerProps) {
    const history = useHistory();
    const info = useSelector(messagesSearchListPageSelector(stage, params));

    const handleOpenChatHistory =
        ({ chatId, id: messageId }: ChatMessageSearch) =>
        () =>
            history.push(CHAT_HISTORY_PAGE_URL.format({ stage, chatId }, { target: messageId }));

    return (
        <List
            rowKey="id"
            dataSource={info.data}
            loading={info.loading}
            renderItem={(item) => (
                <ChatsMessageSearchListItem stage={stage} message={item} handleOpenChat={handleOpenChatHistory(item)} />
            )}
        />
    );
}

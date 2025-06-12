import React from "react";
import { List, Typography } from "antd";
import dayjs from "dayjs";

import { ChatMessageSearch } from "features/chats-moderation/services";
import { ChatMessageCard } from "../ChatMessage/ChatMessageCard";
import { ChatMessageExtraInfo } from "../ChatMessage/ChatMessageExtraInfo";

export interface ChatsMessageSearchListItemProps {
    stage: string;
    message: ChatMessageSearch;
    handleOpenChat: () => void;
}

export const ChatsMessageSearchListItem = ({ stage, message, handleOpenChat }: ChatsMessageSearchListItemProps) => (
    <List.Item key={message.id} actions={[<Typography.Link onClick={handleOpenChat}>Open chat</Typography.Link>]}>
        <ChatMessageCard
            stage={stage}
            message={message}
            extra={
                <ChatMessageExtraInfo
                    time={dayjs(message.time).format("DD MMM YYYY HH:mm:ss")}
                    likeCount={message.likeCount}
                    isDeleted={message.isDeleted}
                    isHidden={message.isHidden}
                />
            }
        />
    </List.Item>
);

import React from "react";
import { Alert } from "antd";

import { ChatMessageItem } from "./ChatMessageItem";
import { ChatMessageContent } from "./ChatMessageContent";
import { ChatSystemMessageItem } from "./ChatSystemMessageItem";
import {
    BOT_MESSAGE_TYPE_ID,
    MEMBER_MESSAGE_TYPE_ID,
    SYSTEM_MESSAGE_TYPE_ID
} from "features/crews-moderation/services";
import { ChatConversationMessage } from "features/community-moderation/services/api";

interface ChatMessageCardProps {
    stage: string;
    message: ChatConversationMessage;
    extra?: JSX.Element;
}

export function ChatMessageCard({ stage, message, extra }: ChatMessageCardProps) {
    const content = <ChatMessageContent stage={stage} message={message} />;

    const deleted = message.isDeleted || message.isHidden;

    if (message.messageTypeId === MEMBER_MESSAGE_TYPE_ID) {
        return (
            <ChatMessageItem extra={extra} stage={stage} message={message} deleted={deleted}>
                {content}
            </ChatMessageItem>
        );
    }

    if (message.messageTypeId === SYSTEM_MESSAGE_TYPE_ID || message.messageTypeId === BOT_MESSAGE_TYPE_ID) {
        return (
            <ChatSystemMessageItem extra={extra} deleted={deleted}>
                {content}
            </ChatSystemMessageItem>
        );
    }

    return (
        <Alert
            type="error"
            message={
                <div>
                    Unsupported Message Type: {message.messageTypeId}.<br />
                    Message ID: {message.id}. <br />
                    Message Content: {content}
                </div>
            }
        />
    );
}

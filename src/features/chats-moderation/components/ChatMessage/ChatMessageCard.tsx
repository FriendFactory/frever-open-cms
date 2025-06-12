import React from "react";
import { Alert } from "antd";

import { ChatMessageItem } from "./ChatMessageItem";
import { ChatMessageContent } from "./ChatMessageContent";
import { ChatSystemMessageItem } from "./ChatSystemMessageItem";
import {
    BOT_MESSAGE_TYPE_ID,
    ChatMessage,
    MEMBER_MESSAGE_TYPE_ID,
    MemberChatMessage,
    SYSTEM_MESSAGE_TYPE_ID
} from "../../services";

interface ChatMessageCardProps {
    stage: string;
    message: ChatMessage;
    extra?: JSX.Element;
    getMemberTag?: (value: MemberChatMessage) => React.ReactNode;
}

export function ChatMessageCard({ stage, getMemberTag, message, extra }: ChatMessageCardProps) {
    const content = <ChatMessageContent stage={stage} message={message} />;

    const deleted = message.isDeleted || message.isHidden;

    if (message.messageTypeId === MEMBER_MESSAGE_TYPE_ID) {
        const tag: React.ReactNode = typeof getMemberTag === "function" ? getMemberTag(message) : null;

        return (
            <ChatMessageItem extra={extra} tag={tag} stage={stage} message={message} deleted={deleted}>
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

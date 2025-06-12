import React, { memo } from "react";
import { List } from "antd";

import { ChatMessageExtraInfoContainer } from "../containers/ChatMessageExtraInfoContainer";
import { ChatMessage } from "../services";
import { ReplyWrapper } from "./ChatMessage/ReplyWrapper";
import { ChatMessageCard } from "./ChatMessage/ChatMessageCard";

interface ChatListProps {
    stage: string;
    messages?: ChatMessage[];
    loading?: boolean;
    chatId: number;
    getMemberTag?: (message: ChatMessage) => React.ReactNode;
}

export function ChatList({ stage, messages, chatId, loading, getMemberTag }: ChatListProps) {
    return (
        <List
            rowKey="id"
            dataSource={messages}
            loading={loading}
            renderItem={(item) => (
                <MemoizedItem stage={stage} chatId={chatId} getMemberTag={getMemberTag} item={item} />
            )}
        />
    );
}

const MemoizedItem = memo(
    ({
        item,
        stage,
        getMemberTag,
        chatId
    }: {
        chatId: number;
        stage: string;
        item: ChatMessage;
        getMemberTag?: (message: ChatMessage) => React.ReactNode;
    }) => (
        <List.Item key={item.id} id={stage + item.id}>
            <div>
                {item.replyToMessage && (
                    <ReplyWrapper>
                        <ChatMessageCard
                            stage={stage}
                            message={item.replyToMessage}
                            getMemberTag={getMemberTag}
                            extra={<ChatMessageExtraInfoContainer item={item.replyToMessage} chatId={chatId} />}
                        />
                    </ReplyWrapper>
                )}
                <ChatMessageCard
                    stage={stage}
                    message={item}
                    extra={<ChatMessageExtraInfoContainer item={item} chatId={chatId} />}
                    getMemberTag={getMemberTag}
                />
            </div>
        </List.Item>
    ),
    (prev, next) =>
        compareItems(prev.item, next.item) && compareItems(prev.item.replyToMessage, next.item.replyToMessage)
);

const compareItems = (itemA: ChatMessage | null, itemB: ChatMessage | null) =>
    itemA?.isDeleted === itemB?.isDeleted && itemA?.isHidden === itemB?.isHidden;

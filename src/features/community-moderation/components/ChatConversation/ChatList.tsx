import React, { memo } from "react";
import { List, Spin } from "antd";
import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";

import { getThemeParams } from "shared/containers/ThemeProvider";
import { ChatConversationMessage } from "features/community-moderation/services/api";
import { ReplyWrapper } from "../ChatMessage/ReplyWrapper";
import { ChatMessageCard } from "../ChatMessage/ChatMessageCard";
import { ChatMessageExtraInfo } from "../ChatMessage/ChatMessageExtraInfo";

interface ChatListProps {
    stage: string;
    initloading: boolean;
    messages?: ChatConversationMessage[];
    lastReadMessageId?: number;
    renderDividerNewMessages: React.ReactNode;
    handleReply: (item: ChatConversationMessage) => void;
}

export function ChatList({
    stage,
    messages,
    lastReadMessageId,
    initloading,
    renderDividerNewMessages,
    handleReply
}: ChatListProps) {
    return (
        <ScrollToBottomStyled>
            <Spin spinning={initloading}>
                <List
                    rowKey="id"
                    dataSource={messages}
                    renderItem={(item) => (
                        <MemoizedItem
                            stage={stage}
                            item={item}
                            lastReadMessageId={lastReadMessageId}
                            renderDividerNewMessages={renderDividerNewMessages}
                            handleReply={handleReply}
                        />
                    )}
                />
            </Spin>
        </ScrollToBottomStyled>
    );
}

const ScrollToBottomStyled = styled(ScrollToBottom)`
    button {
        background-color: ${() => (getThemeParams().dark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, .2)")};
    }

    .ant-list-item:last-child {
        border-block-end: 1px solid rgba(253, 253, 253, 0.12);
    }

    .ant-list-item:first-child {
        border-block-end: none;
    }

    .ant-list {
        height: calc(100vh - 280px);
    }

    .ant-list-items {
        display: flex;
        flex-direction: column-reverse;
    }
`;

interface MemoizedItemProps {
    stage: string;
    item: ChatConversationMessage;
    lastReadMessageId?: number;
    renderDividerNewMessages: React.ReactNode;
    handleReply: (item: ChatConversationMessage) => void;
}

const MemoizedItem = memo(
    ({ item, stage, lastReadMessageId, renderDividerNewMessages, handleReply }: MemoizedItemProps) => (
        <List.Item key={item.id} id={stage + item.id}>
            <div style={{ width: "100%", position: "relative" }}>
                {item.replyToMessage && (
                    <ReplyWrapper>
                        <ChatMessageCard
                            stage={stage}
                            message={item.replyToMessage}
                            extra={<ChatMessageExtraInfo message={item.replyToMessage} handleReply={handleReply} />}
                        />
                    </ReplyWrapper>
                )}
                <ChatMessageCard
                    stage={stage}
                    message={item}
                    extra={<ChatMessageExtraInfo message={item} handleReply={handleReply} />}
                />
                {item.id === lastReadMessageId && renderDividerNewMessages}
            </div>
        </List.Item>
    ),
    (prev, next) =>
        compareItems(prev.item, next.item) && compareItems(prev.item.replyToMessage, next.item.replyToMessage)
);

const compareItems = (itemA: ChatConversationMessage | null, itemB: ChatConversationMessage | null) =>
    itemA?.isLikedByCurrentUser === itemB?.isLikedByCurrentUser;

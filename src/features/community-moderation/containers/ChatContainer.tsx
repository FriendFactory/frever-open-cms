import React from "react";
import { Button, Card, Divider, Space, Spin, theme, Typography } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useCurrentStage } from "shared";
import { ChatConversationResult } from "features/community-moderation/store/reducer";
import { chatConversationSendMessage } from "features/community-moderation/store/actions/chatConversation";
import { ChatList } from "../components/ChatConversation/ChatList";
import { SendMessageForm, SendMessageFormData } from "../components/SendMessage/SendMessageForm";
import { ChatFilter } from "../components/ChatConversation/ChatFilter";
import { ChatConversationMessage } from "../services/api";
import { useChatConversation } from "../hooks/useChatConversation";

interface ChatContainerProps {
    chatId: number;
    handleCloseChat: () => void;
}

export function ChatContainer({ chatId, handleCloseChat }: ChatContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const [form] = useForm<SendMessageFormData>();
    const { info, onSearch, initLoading } = useChatConversation(chatId);

    const renderDividerNewMessages = hasNewMessages(info) ? <DividerStyled>New</DividerStyled> : null;

    const handleSendMessage = (formData: SendMessageFormData) => {
        dispatch(chatConversationSendMessage({ stage, chatId, data: formData }));
        form.resetFields();
    };

    const handleReply = (item: ChatConversationMessage) => form.setFieldValue("replyMessage", item);

    return (
        <Card
            title={
                <Space size="small">
                    <Typography.Text>Chat</Typography.Text>
                    <Spin spinning={info.loading} indicator={<LoadingOutlined spin />} />
                </Space>
            }
            type="inner"
            extra={
                <Space>
                    <ChatFilter handleSearch={onSearch} />
                    <Button size="small" onClick={handleCloseChat}>
                        <CloseOutlined />
                    </Button>
                </Space>
            }>
            <ConversationContainer>
                <ChatWrapper>
                    <ChatList
                        stage={stage}
                        initloading={initLoading}
                        messages={info.data}
                        lastReadMessageId={info.lastReadMessageId}
                        renderDividerNewMessages={renderDividerNewMessages}
                        handleReply={handleReply}
                    />
                </ChatWrapper>
                <SendMessageForm form={form} onFinish={handleSendMessage} />
            </ConversationContainer>
        </Card>
    );
}

const ConversationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: calc(100vh - 220px);
`;

const ChatWrapper = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 10px;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const DividerStyled = styled(Divider)`
    color: ${() => theme.useToken().token.red6} !important;
    position: absolute !important;
    margin: 0 !important;
`;

export const hasNewMessages = (messages: ChatConversationResult) => {
    const totalMessages = messages.data?.length;
    const index = messages?.data?.findIndex((message) => message.id === messages.lastReadMessageId);

    return totalMessages && index && index !== -1 && index < totalMessages - 1 ? true : false;
};

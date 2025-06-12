import React from "react";
import { Empty } from "antd";
import styled from "styled-components";

import { useLiveChat } from "../hooks/useLiveChat";
import { ChatList } from "../components/ChatList";
import { ChatMessage } from "../services";

interface ChatProviderPorps {
    stage: string;
    chatId: number;
    getMemberTag: (message: ChatMessage) => React.ReactNode;
}

export function LiveChatContainer({ stage, chatId, getMemberTag }: ChatProviderPorps) {
    const chatInfo = useLiveChat(chatId);

    return chatInfo ? (
        <ChatWrapper>
            <ChatList messages={chatInfo.data} chatId={chatId} stage={stage} getMemberTag={getMemberTag} />
        </ChatWrapper>
    ) : (
        <Empty />
    );
}

const ChatWrapper = styled.div`
    height: calc(100vh - 150px);
    overflow: scroll;
    display: flex;
    flex-direction: column-reverse;

    .ant-list-items {
        display: flex;
        flex-direction: column-reverse;
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

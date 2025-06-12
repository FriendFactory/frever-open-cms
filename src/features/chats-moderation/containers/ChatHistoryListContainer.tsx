import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import { chatResultSelector } from "../store/reducer";
import { ChatList } from "../components/ChatList";
import { ChatMessage } from "../services";

interface ChatHistoryListContainerProps {
    chatId: number;
    stage: string;
    getMemberTag?: (message: ChatMessage) => React.ReactNode;
}

export function ChatHistoryListContainer({ stage, chatId, getMemberTag }: ChatHistoryListContainerProps) {
    const info = useSelector(chatResultSelector(stage, chatId), shallowEqual);

    return (
        <ChatList
            stage={stage}
            chatId={chatId}
            messages={info.data}
            loading={info.loading}
            getMemberTag={getMemberTag}
        />
    );
}

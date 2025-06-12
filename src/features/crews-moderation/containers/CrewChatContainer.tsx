import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

import { crewInfoByIdSelector } from "../store/reducer";
import { CHAT_HISTORY_PAGE_URL } from "urls";
import { ChatMessage } from "features/chats-moderation";

interface CrewChatContainerProps {
    id: number;
    stage: string;
    renderChat: (chatId: number, getMemberTag: (message: ChatMessage) => React.ReactNode) => React.ReactNode;
}

export function CrewChatContainer({ stage, id, renderChat }: CrewChatContainerProps) {
    const crewInfo = useSelector(crewInfoByIdSelector(stage, id), shallowEqual);
    const chatId = crewInfo.data?.chatId;

    const getMemberTag = (message: ChatMessage) => {
        const role = crewInfo.data?.members?.find((el) => el.groupId === message.group?.id)?.role;
        return role ? <Tag color="blue">{role}</Tag> : null;
    };

    return (
        <Card
            title="Crew live chat"
            loading={crewInfo.loading && !crewInfo.data}
            extra={chatId && <Link to={CHAT_HISTORY_PAGE_URL.format({ stage, chatId })}>Open Chat History</Link>}>
            {chatId && renderChat(chatId, getMemberTag)}
        </Card>
    );
}

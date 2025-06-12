import React from "react";
import { useHistory } from "react-router";
import { UrlPath } from "rd-url-utils";

import { useRightPaneVisibility } from "layout";
import { useCurrentStage } from "shared";
import { InboxListQueryParams } from "../services/getInboxList";
import { ChatContainer } from "./ChatContainer";

interface ConversationWindowContainerProps {
    url: UrlPath<{ stage: string }, { openChatId?: number }>;
    params: InboxListQueryParams;
}

export function ConversationWindowContainer({ url, params }: ConversationWindowContainerProps) {
    const history = useHistory();
    const stage = useCurrentStage();

    if (!params?.openChatId) return null;

    const { closeWindow } = useRightPaneVisibility();

    const handleCloseWindow = () => {
        const { openChatId, ...argParams } = params;
        const newURL = url.format({ stage }, { ...argParams });
        history.push(newURL);

        closeWindow();
    };

    return <ChatContainer chatId={params.openChatId} handleCloseChat={handleCloseWindow} />;
}

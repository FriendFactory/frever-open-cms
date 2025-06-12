import { useEffect, useState } from "react";
import { App } from "antd";

import { getUserGroupId } from "shared/checkUserAccess";
import { initChatConversation } from "../services/initChatConversation";
import {
    getLinkedFreverofficialByGroupId,
    LinkedFreverofficialByGroupIdData
} from "features/permission-moderation/services";

export interface UseChatInfoProps {
    stage: string;
}

export function useChatInfo({ stage }: UseChatInfoProps) {
    const { message } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
    const [freverofficialGroups, setFreverofficialGroups] = useState<LinkedFreverofficialByGroupIdData[]>([]);
    const [chatId, setChatId] = useState<number | null>(null);

    const startChat = async (freverOfficialGroupId: number, groupId: number) => {
        try {
            const chatId = await initChatConversation(stage, { freverOfficialGroupId, groupId });
            setChatId(chatId);
        } catch (error) {
            message.error(`Filed to init chat conversation ${(error as Error).toString()}`);
        }
    };

    const closeChat = () => setChatId(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isMounted) {
                setLoading(true);
                try {
                    const groupId = getUserGroupId(stage);

                    const linkedAccountsToCurrentUser = await getLinkedFreverofficialByGroupId(stage, Number(groupId));
                    setFreverofficialGroups(linkedAccountsToCurrentUser);
                    setLoading(false);
                } catch (error) {
                    message.error(`Filed to open chat ${(error as Error).toString()}`);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [stage]);

    return { loading, freverofficialGroups, chatId, startChat, closeChat };
}

import { useState, useEffect } from "react";
import { ChatConversationMessage } from "../services/api";

export const useChatHasChanges = (data: ChatConversationMessage[] | undefined) => {
    const [hasChanges, setHasChanges] = useState(false);
    const [lastItemTime, setLastItemTime] = useState<string | undefined>();

    useEffect(() => {
        const newLastItem = getLastItemTime(data);

        setHasChanges(newLastItem !== lastItemTime);
        setLastItemTime(newLastItem);
    }, [data]);

    return hasChanges;
};

const getLastItemTime = (data: ChatConversationMessage[] | undefined) => data?.[data?.length - 1]?.time;

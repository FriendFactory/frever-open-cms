import { useState, useEffect } from "react";
import { ChatMessage } from "../services";

export const useChatHasChanges = (data: ChatMessage[] | undefined) => {
    const [hasChanges, setHasChanges] = useState(false);
    const [lastItemTime, setLastItemTime] = useState<string | undefined>();

    useEffect(() => {
        const newLastItem = getLastItemTime(data);

        setHasChanges(newLastItem !== lastItemTime);
        setLastItemTime(newLastItem);
    }, [data]);

    return hasChanges;
};

const getLastItemTime = (data: ChatMessage[] | undefined) => data?.[data?.length - 1]?.time;

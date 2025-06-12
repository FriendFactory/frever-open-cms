import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useCurrentStage } from "shared";
import { chatMessagesLoadAction } from "../store/actions";
import { chatResultSelector } from "../store/reducer";
import { useChatHasChanges } from "./useChatHasChanges";
import { CHAT_HISTORY_LIST_BASE_PAGE_SIZE } from "urls";

const MAX_DELAY = 40000;
const MIN_DELAY = 2500;
const BASE_DELAY = 5000;

export const useLiveChat = (chatId: number) => {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const info = useSelector(chatResultSelector(stage, chatId), shallowEqual);

    const [delay, setDelay] = useState(BASE_DELAY);
    const hasChanges = useChatHasChanges(info.data);

    const loadMessages = () => {
        dispatch(chatMessagesLoadAction({ stage, chatId, params: { takeOlder: CHAT_HISTORY_LIST_BASE_PAGE_SIZE } }));
    };

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadMessages();

            if (!info.loading) {
                if (hasChanges) {
                    const newDelay = delay / 2;
                    setDelay(newDelay < MIN_DELAY ? MIN_DELAY : newDelay);
                } else {
                    const newDelay = delay * 2;
                    setDelay(newDelay > MAX_DELAY ? MAX_DELAY : newDelay);
                }
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, info, hasChanges]);

    return info;
};

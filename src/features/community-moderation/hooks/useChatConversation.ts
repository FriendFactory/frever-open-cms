import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useCurrentStage } from "shared";
import { useChatHasChanges } from "./useChatHasChanges";
import { COMMUNITY_CONVERSATION_CHAT_LIST_SIZE } from "urls";
import { chatConversationResultSelector } from "../store/reducer";
import { chatConversationLoadAction } from "../store/actions/chatConversation";
import { ChatConversationQueryParams } from "../services/getChatConversation";

const MAX_DELAY = 20000;
const MIN_DELAY = 2500;
const BASE_DELAY = 5000;

export const useChatConversation = (chatId: number) => {
    const stage = useCurrentStage();
    const dispatch = useDispatch();
    const [params, setParams] = useState<ChatConversationQueryParams>({});
    const [initLoading, setInitLoading] = useState(false);
    const [delay, setDelay] = useState(BASE_DELAY);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const info = useSelector(chatConversationResultSelector(stage, chatId), shallowEqual);
    const hasChanges = useChatHasChanges(info.data);

    const loadMessages = () => {
        dispatch(
            chatConversationLoadAction({
                stage,
                chatId,
                params: { takeOlder: COMMUNITY_CONVERSATION_CHAT_LIST_SIZE, ...params }
            })
        );
    };

    useEffect(() => {
        setInitLoading(true);
        loadMessages();
    }, [params]);

    useEffect(() => {
        if (!info.loading && initLoading) setInitLoading(false);

        const currentTimer = setTimeout(() => {
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

        setTimer(currentTimer);

        return () => clearTimeout(currentTimer);
    }, [delay, info, hasChanges]);

    useEffect(() => {
        if (timer) clearTimeout(timer);

        setDelay(BASE_DELAY);
        setParams({});
        loadMessages();
    }, [chatId]);

    const onSearch = (argParams: ChatConversationQueryParams) => {
        const newParams = { ...params, ...argParams };
        setParams(newParams);
    };

    return { info, onSearch, initLoading };
};

import { Action } from "redux";

import { AppState } from "app-state";
import { ChatMessage } from "../../services";
import {
    chatMessagesActionGroup,
    chatMessagesLoadingAction,
    chatMessagesLoadedOkAction,
    chatMessagesLoadedErrorAction,
    updateChatMessageAction
} from "../actions";

export interface ChatMessagesState {
    loading: boolean;
    error?: string;
    data?: ChatMessage[];
    hasNext?: boolean;
    hasPrev?: boolean;
}

export const chatMessagesReducer = chatMessagesActionGroup.hashedReducer(
    (props) => chatKeySelector(props.stage, props.chatId),
    (state: ChatMessagesState | undefined, action: Action): ChatMessagesState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (chatMessagesLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (chatMessagesLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (chatMessagesLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.result,
                hasNext: action.hasNext,
                hasPrev: action.hasPrev
            };
        }

        if (updateChatMessageAction.is(action)) {
            return {
                ...state,
                data: state.data?.map((el) => {
                    let newItem: ChatMessage = { ...el };

                    if (el.id === action.message.id) newItem = action.message;

                    if (el.replyToMessage?.id === action.message.id) newItem.replyToMessage = action.message;

                    return newItem;
                })
            };
        }

        return state;
    }
);

export interface ChatResult {
    loading: boolean;
    data?: ChatMessage[];
    error?: string;
    hasNext: boolean;
    hasPrev: boolean;
    firstTarget: number | undefined;
    lastTarget: number | undefined;
}

export const chatKeySelector = (stage: string, chatId: number) => `${stage}/chat/${chatId}`;

export const chatResultSelector =
    (stage: string, chatId: number) =>
    (appState: AppState): ChatResult => {
        const chatKey = chatKeySelector(stage, chatId);
        const { hasNext, hasPrev, data, error, loading } = appState.chats[chatKey] || {};

        const firstTarget = data?.[0]?.id;

        const lastTarget = data?.[data.length - 1]?.id;

        return {
            loading: loading ?? false,
            hasNext: hasNext ?? false,
            hasPrev: hasPrev ?? false,
            error,
            data,
            firstTarget,
            lastTarget
        };
    };

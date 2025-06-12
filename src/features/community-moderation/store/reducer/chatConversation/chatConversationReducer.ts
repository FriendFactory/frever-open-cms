import { Action } from "redux";

import { AppState } from "app-state";

import { ChatConversationMessage } from "features/community-moderation/services/api";
import {
    chatConversationActionGroup,
    chatConversationLoadedErrorAction,
    chatConversationLoadedOkAction,
    chatConversationLoadingAction
} from "../../actions/chatConversation";

export interface ChatConversationState {
    loading: boolean;
    error?: string;
    data?: ChatConversationMessage[];
    lastReadMessageId?: number;
}

export const chatConversationReducer = chatConversationActionGroup.hashedReducer(
    (props) => chatConversationKeySelector(props.stage, props.chatId),
    (state: ChatConversationState | undefined, action: Action): ChatConversationState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (chatConversationLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (chatConversationLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (chatConversationLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                data: action.result,
                lastReadMessageId: action.lastReadMessageId
            };
        }

        return state;
    }
);

export interface ChatConversationResult {
    loading: boolean;
    data?: ChatConversationMessage[];
    error?: string;
    lastReadMessageId?: number;
}

export const chatConversationResultSelector =
    (stage: string, chatId: number) =>
    (appState: AppState): ChatConversationResult => {
        const chatKey = chatConversationKeySelector(stage, chatId);
        const { data, error, loading, lastReadMessageId } = appState.cummunityLiveChat[chatKey] || {};

        return {
            loading: loading ?? false,
            error,
            data,
            lastReadMessageId
        };
    };

const chatConversationKeySelector = (stage: string, chatId: number) => `${stage}/chat-conversation/${chatId}`;

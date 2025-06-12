import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { CHAT_MESSAGES_SEARCH_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import { calculateListTotal } from "shared/calculate-list-total";
import {
    chatMessagesSearchActionGroup,
    chatMessagesSearchLoadingAction,
    chatMessagesSearchLoadedOkAction,
    chatMessagesSearchLoadedErrorAction
} from "../../actions";
import { messageSearchKeySelector } from "./entitiesReducer";
import { ChatMessageSearchListQueryParams } from "features/chats-moderation";

export const messagesSearchListReducer = createListPageHashedReducer({
    group: chatMessagesSearchActionGroup,
    loading: chatMessagesSearchLoadingAction,
    loadedOk: chatMessagesSearchLoadedOkAction,
    loadedError: chatMessagesSearchLoadedErrorAction,
    keyFactory: (stage, entity) => messageSearchKeySelector(stage, entity.id)
});

export const messagesSearchListPageSelector =
    (stage: string, params: ChatMessageSearchListQueryParams = {}) =>
    (appState: AppState) => {
        const result = appState.chatMessagesSearch.listPages[hashKeySelector(stage, params)];

        const data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.chatMessagesSearch?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? CHAT_MESSAGES_SEARCH_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        const total = calculateListTotal(data?.length ?? 0, params.skip, CHAT_MESSAGES_SEARCH_SIZE);

        return {
            loading: result?.loading,
            error: result?.error,
            total,
            data,
            params,
            stage,
            pageSize,
            currentPage
        };
    };

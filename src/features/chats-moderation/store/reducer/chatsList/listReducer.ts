import { hashKeySelector, pageKeySelector } from "utils";
import { CHAT_LIST_BASE_PAGE_SIZE } from "urls";
import { ChatListQueryParams } from "features/chats-moderation/services";
import { createListPageHashedReducer } from "shared/store";
import { chatInfoKeySelector } from "./entitiesReducer";
import { AppState } from "app-state";
import { calculateListTotal } from "shared/calculate-list-total";
import {
    chatsListActionGroup,
    chatsListLoadingAction,
    chatsListLoadedOkAction,
    chatsListLoadedErrorAction
} from "../../actions";

export const chatsListReducer = createListPageHashedReducer({
    group: chatsListActionGroup,
    loading: chatsListLoadingAction,
    loadedOk: chatsListLoadedOkAction,
    loadedError: chatsListLoadedErrorAction,
    keyFactory: (stage, entity) => chatInfoKeySelector(stage, entity.id)
});

export const chatsListPageSelector =
    (stage: string, params: ChatListQueryParams = {}) =>
    (appState: AppState) => {
        const result = appState.chatsList.listPages[hashKeySelector(stage, params)];

        const data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.chatsList?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? CHAT_LIST_BASE_PAGE_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        const total = calculateListTotal(data?.length ?? 0, params.skip, CHAT_LIST_BASE_PAGE_SIZE);

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

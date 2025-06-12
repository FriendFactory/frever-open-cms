import { hashKeySelector, pageKeySelector } from "utils";
import { COMMUNITY_INBOX_CHAT_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import { AppState } from "app-state";

import { calculateListTotal } from "shared/calculate-list-total";
import { inboxInfoKeySelector } from "./entitiesReducer";
import {
    inboxListActionGroup,
    inboxListLoadedErrorAction,
    inboxListLoadedOkAction,
    inboxListLoadingAction
} from "../../actions/inboxList";
import { InboxListQueryParams } from "features/community-moderation/services/getInboxList";
import { InboxInfo } from "features/community-moderation/services/api";

export const inboxListReducer = createListPageHashedReducer({
    group: inboxListActionGroup,
    loading: inboxListLoadingAction,
    loadedOk: inboxListLoadedOkAction,
    loadedError: inboxListLoadedErrorAction,
    keyFactory: (stage, entity) => inboxInfoKeySelector(stage, entity.id)
});

export interface InboxListPageSelectorType {
    loading: boolean;
    error: string | undefined;
    total: number;
    data: InboxInfo[] | undefined;
    params: InboxListQueryParams;
    stage: string;
    pageSize: number;
    currentPage: number;
}

export const inboxListPageSelector =
    (stage: string, params: InboxListQueryParams = {}) =>
    (appState: AppState): InboxListPageSelectorType => {
        const result = appState.communityChat.listPages[hashKeySelector(stage, params)];

        const data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.communityChat?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? COMMUNITY_INBOX_CHAT_LIST_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        const total = calculateListTotal(data?.length ?? 0, params.skip, COMMUNITY_INBOX_CHAT_LIST_SIZE);

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

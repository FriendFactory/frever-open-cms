import qs from "qs";

import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE } from "urls";
import { CreatorWelcomeMessagesQueryParams, StarCreatorWelcomeMessage } from "../../services";
import { pageKeySelector } from "utils";

export interface CreatorMessagesListPageResult extends PagingInfoSelectResult {
    error?: string;
    loading: boolean;
    data?: Array<StarCreatorWelcomeMessage & { id: string }>;
}

export function creatorMessagesListPage(
    stage: string,
    params: CreatorWelcomeMessagesQueryParams
): (appState: AppState) => CreatorMessagesListPageResult {
    return (appState) => {
        const state = appState.creatorMessages.listPages[creatorMessagesListHashKeySelector(stage, params || {})];
        const page = state?.pages[pageKeySelector(params.skip)]
            ?.map((el) => ({ ...appState.creatorMessages.entities[el]!, id: el }))
            .filter(Boolean);

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE) + 1;

        return {
            error: state?.error,
            loading: state?.loading ?? false,
            data: page,
            currentPage,
            pageSize: DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE,
            total: state?.total ?? 0
        };
    };
}

export function creatorMessagesListHashKeySelector(stage: string, params: CreatorWelcomeMessagesQueryParams) {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify(keyParams ?? {})}`;
}

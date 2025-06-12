import qs from "qs";

import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE } from "urls";
import { StarCreatorCode, CreatorCodesQueryParams } from "../../services";
import { pageKeySelector } from "utils";

export interface CreatorCodesListPageResult extends PagingInfoSelectResult {
    error?: string;
    loading: boolean;
    data?: StarCreatorCode[];
}

export function creatorCodesListPageSelector(
    stage: string,
    params: CreatorCodesQueryParams
): (appState: AppState) => CreatorCodesListPageResult {
    return (appState) => {
        const state = appState.creatorCodes.listPages[creatorCodesListHashKeySelector(stage, params || {})];
        const page = state?.pages[pageKeySelector(params.skip)]
            ?.map((el) => appState.creatorCodes.entities[el]!)
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

export function creatorCodesListHashKeySelector(stage: string, params: CreatorCodesQueryParams) {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify(keyParams ?? {})}`;
}

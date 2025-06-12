import { Action } from "redux";
import qs from "query-string";

import { AppState } from "app-state";
import { DEFAULT_HASHTAG_LIST_SIZE } from "urls";
import { GetHashtagListParams, Hashtag } from "features/hashtag-moderation/services";
import { PagingInfoSelectResult } from "shared";

import {
    hashtagListLoadingAction,
    hashtagListLoadedOkAction,
    hashtagListLoadedErrorAction,
    hashtagListActionGroup,
    HashtagListParams
} from "../actions";
import { hashtagKeySelector } from "./hashtags.reducer";
import { calculateListTotal } from "shared/calculate-list-total";

export interface HashtagListPagesState {
    loading: boolean;
    error?: string;
    total?: number;
    pagesById?: { [pageKey: string]: string[] };
}

export const hashtagListPageReducer = hashtagListActionGroup.hashedReducer(
    ({ stage, params }) => hashtagStatusKeySelector({ stage, params }),
    (state: HashtagListPagesState | undefined, action: Action): HashtagListPagesState => {
        if (!state) {
            state = { loading: false };
        }

        if (hashtagListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (hashtagListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (hashtagListLoadedOkAction.is(action)) {
            const ids = action.result.data.map((hashtag) => hashtagKeySelector(action.stage, hashtag.id));

            return {
                ...state,
                loading: false,
                total: action.result.count,
                pagesById: {
                    ...state.pagesById,
                    [pageKeySelector(action.params.skip)]: ids
                }
            };
        }

        return state;
    }
);

export interface HashtagListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    stage: string;
    params: GetHashtagListParams;
    total: number;
    pageSize: number;
    currentPage: number;
    error?: string;
    data?: Hashtag[];
    isNextPageAvailable?: boolean;
}

export function hashtagListPageSelector(
    stage: string,
    params: GetHashtagListParams,
    additionalPageSkips?: number[]
): (appState: AppState) => HashtagListPageResult {
    return (appState) => {
        const listPages = appState.hashtag.listPages[hashtagStatusKeySelector({ stage, params })];
        const entities = appState.hashtag.entities;

        const pages = [params.skip ?? 0, ...(additionalPageSkips ?? [])]
            .map((skip) => listPages?.pagesById?.[pageKeySelector(skip)])
            .filter((page): page is string[] => !!page);

        const hastags = pages
            .flat()
            .filter(
                (hashtagKey, index, allHashtag): hashtagKey is string =>
                    !!hashtagKey && allHashtag.indexOf(hashtagKey) === index
            )
            .map((key) => entities[key]);

        const isNextPageAvailable = pages[pages.length - 1]?.length === DEFAULT_HASHTAG_LIST_SIZE;

        const currentSkip = additionalPageSkips?.[additionalPageSkips?.length - 1] ?? params.skip ?? 0;

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_HASHTAG_LIST_SIZE) + 1;

        return {
            loading: listPages?.loading ?? false,
            data: hastags,
            params,
            total: calculateListTotal(pages[pages.length - 1]?.length, currentSkip, DEFAULT_HASHTAG_LIST_SIZE),
            stage,
            error: listPages?.error,
            pageSize: DEFAULT_HASHTAG_LIST_SIZE,
            currentPage,
            isNextPageAvailable
        };
    };
}

export function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}

export const hashtagStatusKeySelector = ({ stage, params }: HashtagListParams): string => {
    const { skip, ...rest } = params;
    return `${stage}/params:${qs.stringify((rest as any) ?? {})}`;
};

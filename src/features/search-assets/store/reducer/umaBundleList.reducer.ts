import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE } from "urls";
import { UmaBudnleListQueryParams, UmaBundle } from "../../services";
import {
    umaBundleListActionGroup,
    umaBundleListLoadingAction,
    umaBundleListLoadedOkAction,
    umaBundleListLoadedErrorAction
} from "../actions";
import { calculateListTotal } from "shared/calculate-list-total";

export interface UmaBundleListState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: UmaBundle[];
    };
}

export const umaBundleListReducer = umaBundleListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: UmaBundleListState | undefined, action: Action): UmaBundleListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (umaBundleListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (umaBundleListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (umaBundleListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result
                }
            };
        }

        return state;
    }
);

export interface UmaBundleListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: UmaBundle[];
    stage: string;
    params: UmaBudnleListQueryParams;
}

export function umaBundleListPageSelector(
    stage: string,
    params: UmaBudnleListQueryParams
): (appState: AppState) => UmaBundleListPageResult {
    return (appState) => {
        const umaBunbleListState = appState.umaBundleList[hashKeySelector(stage, params)];
        const page = umaBunbleListState?.pages[pageKeySelector(params.skip)];

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE) + 1;

        return {
            loading: umaBunbleListState?.loading ?? false,
            data: page,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE),
            stage,
            error: umaBunbleListState?.error,
            pageSize: DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: UmaBudnleListQueryParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}

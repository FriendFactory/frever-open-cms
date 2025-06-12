import { Action } from "redux";
import * as qs from "query-string";

import { externalSongKeySelector } from "./externalSong.reducer";
import { ExternalSong, ExternalSongListQueryParams } from "features/search-assets/services";
import {
    externalSongListActionGroup,
    externalSongListLoadingAction,
    externalSongListLoadedOkAction,
    externalSongListLoadedErrorAction
} from "../../actions";
import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";
import { calculateListTotal } from "shared/calculate-list-total";

export interface ExternalSongListState {
    loading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const externalSongListReducer = externalSongListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: ExternalSongListState | undefined, action: Action): ExternalSongListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (externalSongListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (externalSongListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (externalSongListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        externalSongKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface ExternalSongListResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: ExternalSong[];
    stage: string;
    params: ExternalSongListQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export function externalSongListPageSelector(
    stage: string,
    params: ExternalSongListQueryParams
): (appState: AppState) => ExternalSongListResult {
    return (appState) => {
        const listState = appState.externalSong.listPage[hashKeySelector(stage, params)];
        const page = listState?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((key) => appState.externalSong.entities[key]);

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_ASSETS_PAGE_SIZE) + 1;

        return {
            error: listState?.error,
            loading: listState?.loading ?? false,
            data,
            stage,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_ASSETS_PAGE_SIZE),
            pageSize: DEFAULT_ASSETS_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: ExternalSongListQueryParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/external-song/${qs.stringify((keyParams as any) ?? {})}`.toLowerCase();
}

export const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;

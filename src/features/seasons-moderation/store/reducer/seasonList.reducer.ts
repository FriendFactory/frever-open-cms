import { Action } from "redux";
import qs from "query-string";

import { DEFAULT_SEASON_LIST_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { SeasonBaseInfo, SeasonListQueryParams } from "features/seasons-moderation/services";
import { seasonKeySelector } from "./season.reducer";
import { AppState } from "app-state";
import {
    seasonListActionGroup,
    seasonListLoadingAction,
    seasonListLoadedOkAction,
    seasonListLoadedErrorAction
} from "../actions";

export interface SeasonListPagesState {
    loading: boolean;
    error?: string;
    total?: number;
    pagesById?: { [pageKey: string]: string[] };
}

export const seasonListPageReducer = seasonListActionGroup.hashedReducer(
    ({ stage, params }) => seasonListPageKeySelector(stage, params),
    (state: SeasonListPagesState | undefined, action: Action): SeasonListPagesState => {
        if (!state) {
            state = { loading: false };
        }

        if (seasonListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (seasonListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (seasonListLoadedOkAction.is(action)) {
            const ids = action.result.data.map((el) => seasonKeySelector(action.stage, el.id));

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

export interface SeasonListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    stage: string;
    params: SeasonListQueryParams;
    error?: string;
    data?: SeasonBaseInfo[];
}

export function seasonListPageSelector(
    stage: string,
    params: SeasonListQueryParams
): (appState: AppState) => SeasonListPageResult {
    return (appState) => {
        const listPages = appState.season.listPages[seasonListPageKeySelector(stage, params)];
        const entities = appState.season.entities;
        const page = listPages?.pagesById?.[pageKeySelector(params.skip ?? 0)];
        return {
            loading: listPages?.loading ?? false,
            data: page?.map((el) => entities[el]!).filter(Boolean),
            params,
            total: listPages?.total ?? 0,
            stage,
            error: listPages?.error,
            pageSize: DEFAULT_SEASON_LIST_PAGE_SIZE,
            currentPage: Math.floor((params.skip ?? 0) / (params.take ?? DEFAULT_SEASON_LIST_PAGE_SIZE)) + 1
        };
    };
}

export const pageKeySelector = (skip: number | undefined) => `skip = ${skip ?? 0}`;

export const seasonListPageKeySelector = (stage: string, { skip, ...rest }: SeasonListQueryParams) =>
    `${stage}/params:${qs.stringify((rest as any) ?? {})}`;

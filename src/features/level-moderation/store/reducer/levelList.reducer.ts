import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { LevelListQueryParams, Level } from "../../services";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE } from "urls";
import {
    levelListActionGroup,
    levelListLoadingAction,
    levelListLoadedOkAction,
    levelListLoadedErrorAction
} from "../actions";
import { calculateListTotal } from "shared/calculate-list-total";
import { levelKeySelector } from "./level.reducer";

export interface LevelListState {
    loading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const levelListReducer = levelListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: LevelListState | undefined, action: Action): LevelListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (levelListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (levelListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (levelListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        levelKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface LevelListPageResult extends PagingInfoSelectResult {
    error?: string;
    loading: boolean;
    data?: Level[];
    stage: string;
    params: LevelListQueryParams;
}

export function levelListPageSelector(
    stage: string,
    params: LevelListQueryParams
): (appState: AppState) => LevelListPageResult {
    return (appState) => {
        const levelListState = appState.level.listPage[hashKeySelector(stage, params)];
        const page = levelListState?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => {
            const { eventById, ...level } = appState.level.entities[el];
            const event = eventById.map((el) => appState.event.entities[el]);
            return { ...level, event };
        });

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_LEVEL_LIST_PAGE_SIZE) + 1;

        return {
            error: levelListState?.error,
            loading: levelListState?.loading ?? false,
            data,
            stage,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_LEVEL_LIST_PAGE_SIZE),
            pageSize: DEFAULT_LEVEL_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: LevelListQueryParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

export const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;

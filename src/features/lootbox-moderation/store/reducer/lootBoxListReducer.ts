import { Action } from "redux";

import {
    lootBoxListActionGroup,
    lootBoxListLoadingAction,
    lootBoxListLoadedOkAction,
    lootBoxListLoadedErrorAction,
    DEFAULT_LOOT_BOX_PAGE_SIZE
} from "../actions";
import { LootBox, LootBoxQueryParams } from "../../services";
import { lootBoxKeySelector } from "./lootBoxEntitiesReducer";
import { PagingInfoSelectResult } from "shared";
import { hashKeySelector, pageKeySelector } from "utils";
import { AppState } from "app-state";

export interface LootBoxListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const lootBoxListReducer = lootBoxListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: LootBoxListState | undefined, action: Action): LootBoxListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (lootBoxListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (lootBoxListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (lootBoxListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        lootBoxKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface LootBoxListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: LootBox[];
    total: number;
    params: LootBoxQueryParams;
}

export function lootBoxListSelector(
    stage: string,
    params: LootBoxQueryParams
): (appState: AppState) => LootBoxListPageResult {
    return (appState) => {
        const state = appState.lootBox.list[hashKeySelector(stage, params)];

        const data = state?.pages?.[pageKeySelector(params.skip)]
            ?.map((el) => appState.lootBox.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_LOOT_BOX_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;
        return {
            loading: state?.loading ?? false,
            error: state?.error,
            total: state?.total ?? 0,
            data,
            currentPage,
            pageSize,
            params
        };
    };
}

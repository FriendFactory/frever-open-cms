import * as qs from "query-string";
import { Action } from "redux";

import { DEFAULT_OUTFIT_LIST_PAGE_SIZE } from "urls";
import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { Outfit, OutfitListQueryParams } from "../../services";
import { outfitKeySelector } from "./outfit.reducer";
import { calculateListTotal } from "shared/calculate-list-total";
import {
    outfitListActionGroup,
    outfitListLoadingAction,
    outfitListLoadedOkAction,
    outfitListLoadedErrorAction
} from "../actions";

export interface OutfitListState {
    loading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
}

export const outfitListReducer = outfitListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: OutfitListState | undefined, action: Action): OutfitListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (outfitListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (outfitListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (outfitListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.map((el) =>
                        outfitKeySelector(action.stage, el.id)
                    )
                }
            };
        }

        return state;
    }
);

export interface OutfitListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    stage: string;
    params: OutfitListQueryParams;
    error?: string;
    data?: Outfit[];
}

export function outfitListPageSelector(
    stage: string,
    params: OutfitListQueryParams
): (appState: AppState) => OutfitListPageResult {
    return (appState) => {
        const outfitListState = appState.outfit.listPage[hashKeySelector(stage, params)];
        const page = outfitListState?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.outfit.entities[el]!).filter(Boolean);
        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_OUTFIT_LIST_PAGE_SIZE) + 1;

        return {
            error: outfitListState?.error,
            loading: outfitListState?.loading ?? false,
            data,
            stage,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_OUTFIT_LIST_PAGE_SIZE),
            pageSize: DEFAULT_OUTFIT_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

const hashKeySelector = (stage: string, { skip, ...keyParams }: OutfitListQueryParams): string =>
    `${stage}/${qs.stringify((keyParams as any) ?? {})}`;

export const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;

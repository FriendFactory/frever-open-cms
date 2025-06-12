import { AppState } from "app-state";
import { Action } from "redux";
import * as qs from "query-string";

import { AssetData, AssetDataNames, AssetListParams } from "features/search-assets/services";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";
import { PagingInfoSelectResult } from "shared";
import { calculateListTotal } from "shared/calculate-list-total";
import { assetKeySelector } from "./asset.reducer";
import {
    assetListActionGroup,
    assetListLoadingAction,
    assetListLoadedOkAction,
    assetListLoadedErrorAction
} from "../../actions";

export interface AssetListState {
    loading: boolean;
    error?: string;
    pages?: {
        [pageKey: string]: string[];
    };
    total?: number;
}

export const assetListReducer = assetListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.asset, props.params),
    (state: AssetListState | undefined, action: Action): AssetListState => {
        if (!state) {
            state = {
                loading: false
            };
        }

        if (assetListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (assetListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (assetListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip, action.params.take)]: action.result.map((el) =>
                        assetKeySelector(action.stage, action.asset, el.id)
                    )
                },
                total: action.total
            };
        }

        return state;
    }
);

export interface AssetListPageResult<T extends AssetDataNames> extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: AssetData[T][];
    stage: string;
    params: AssetListParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export function assetListPageSelector<T extends AssetDataNames>(
    stage: string,
    params: AssetListParams,
    asset: T
): (appState: AppState) => AssetListPageResult<T> {
    return (appState) => {
        const assetListState = appState.asset.listPage[hashKeySelector(stage, asset, params)];
        const page = assetListState?.pages?.[pageKeySelector(params.skip, params.take)];

        const data = page?.map((key) => appState.asset.entities[key] as AssetData[T]);

        const pageSize = Number(params?.take ?? DEFAULT_ASSETS_PAGE_SIZE);

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            error: assetListState?.error,
            loading: assetListState?.loading ?? false,
            data,
            stage,
            params,
            total: assetListState?.total ?? calculateListTotal(page?.length ?? 0, params.skip, pageSize),
            pageSize,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, asset: AssetDataNames, params: AssetListParams): string {
    const { skip, take, ...keyParams } = params || {};

    return `${stage}/${asset}/${qs.stringify((keyParams as any) ?? {})}`.toLowerCase();
}

export const pageKeySelector = (skip?: number, take?: number) =>
    `skip = ${skip ?? 0} / take = ${take ?? DEFAULT_ASSETS_PAGE_SIZE}`;

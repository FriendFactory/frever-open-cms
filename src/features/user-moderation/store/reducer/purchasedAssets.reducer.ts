import * as qs from "query-string";
import { Action } from "redux";

import { AppState } from "app-state";
import { PurchasedAsset, PurchasedAssetsQueryParams } from "../../services";
import {
    purchasedAssetsActionGroup,
    purchasedAssetsLoadingAction,
    purchasedAssetsLoadedOkAction,
    purchasedAssetsLoadedErrorAction
} from "../actions";
import { DEFAULT_PURCHASES_LIST_PAGE_SIZE } from "urls";
import { calculateListTotal } from "shared/calculate-list-total";

export interface PurchasedAssetsState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: PurchasedAsset[];
    };
    isNextPageAvailable?: boolean;
}

export const purchasedAssetsReducer = purchasedAssetsActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: PurchasedAssetsState | undefined, action: Action): PurchasedAssetsState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (purchasedAssetsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (purchasedAssetsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (purchasedAssetsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result
                },
                isNextPageAvailable: action.isNextPageAvailable
            };
        }

        return state;
    }
);

export interface PurchasedAssetsPageResult {
    stage: string;
    error?: string;
    loading: boolean;
    data?: PurchasedAsset[];
    isNextPageAvailable?: boolean;
    isPrevPageAvailable?: boolean;
}

export const purchasedAssetsPageSelector =
    (stage: string, params: PurchasedAssetsQueryParams) => (appState: AppState) => {
        const state = appState.purchasedAssets[hashKeySelector(stage, params)];
        const data = state?.pages[pageKeySelector(params.skip)];

        const pageSize = Number(params?.take ?? DEFAULT_PURCHASES_LIST_PAGE_SIZE);
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            error: state?.error,
            loading: state?.loading ?? false,
            data,
            stage,
            pageSize,
            currentPage,
            total: calculateListTotal(data?.length ?? 0, params.skip, pageSize)
        };
    };

function hashKeySelector(stage: string, params: PurchasedAssetsQueryParams): string {
    const { skip, assetType, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}

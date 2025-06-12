import { Action } from "redux";
import qs from "query-string";

import { InAppProduct, InAppProductsQueryParams } from "features/banking-moderation/services";
import { inAppProductKeySelector } from "./inAppProductEntities.reducer";
import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { IN_APP_PRODUCTS_BASE_PAGE_SIZE } from "urls";
import {
    inAppProductListActionGroup,
    inAppProductListLoadingAction,
    inAppProductListLoadedOkAction,
    inAppProductListLoadedErrorAction
} from "../../actions";

export interface ProductListState {
    loading: boolean;
    error?: string;
    total?: number;
    pagesById?: { [pageKey: string]: string[] };
}

export const inAppProductListReducer = inAppProductListActionGroup.hashedReducer(
    ({ stage, params }) => productStatusKeySelector(stage, params),
    (state: ProductListState | undefined, action: Action): ProductListState => {
        if (!state) {
            state = { loading: false };
        }

        if (inAppProductListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (inAppProductListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (inAppProductListLoadedOkAction.is(action)) {
            const ids = action.result.data.map((item) => inAppProductKeySelector(action.stage, item.id));

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

export interface ProductListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: InAppProduct[];
    stage: string;
    params: InAppProductsQueryParams;
}

export function inAppProductListPageSelector(
    stage: string,
    params: InAppProductsQueryParams
): (appState: AppState) => ProductListPageResult {
    return (appState) => {
        const listPages = appState.inAppProducts.listPages[productStatusKeySelector(stage, params)];

        const data = listPages?.pagesById?.[pageKeySelector(params.skip)]
            ?.map((item) => appState.inAppProducts.entities[item]!)
            ?.filter(Boolean);

        const pageSize = params.take ?? IN_APP_PRODUCTS_BASE_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: listPages?.loading ?? false,
            data,
            params,
            total: listPages?.total ?? 0,
            stage,
            error: listPages?.error,
            pageSize,
            currentPage
        };
    };
}

export const pageKeySelector = (skip: number | undefined): string => `skip = ${skip ?? 0}`;

export const productStatusKeySelector = (stage: string, { skip, ...params }: InAppProductsQueryParams): string =>
    `${stage}/params:${qs.stringify((params as any) ?? {})}`;

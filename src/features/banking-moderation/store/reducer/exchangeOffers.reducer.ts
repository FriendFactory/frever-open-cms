import qs from "query-string";
import { Action } from "redux";

import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";
import { EXCHANGE_OFFERS_BASE_PAGE_SIZE } from "urls";
import { ExchangeOffer, ExchangeOfferQueryParams } from "../../services";
import {
    exchangeOffersActionGroup,
    exchangeOffersLoadingAction,
    exchangeOffersLoadedOkAction,
    exchangeOffersLoadedErrorAction
} from "../actions";

export interface ExchangeOffersState {
    loading: boolean;
    error?: string;
    total?: number;
    pages: {
        [pageKey: string]: ExchangeOffer[];
    };
}

export const exchangeOffersReducer = exchangeOffersActionGroup.hashedReducer(
    (e) => exchangeOffersPageHashKeySelector(e.stage, e.params),
    (state: ExchangeOffersState | undefined, action: Action): ExchangeOffersState => {
        if (!state) {
            state = {
                loading: false,
                pages: {}
            };
        }

        if (exchangeOffersLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (exchangeOffersLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (exchangeOffersLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data
                }
            };
        }

        return state;
    }
);

export interface ExchangeOffersPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: ExchangeOffer[];
    stage: string;
    params: ExchangeOfferQueryParams;
}

export function exchangeOffersPageSelector(
    stage: string,
    params: ExchangeOfferQueryParams
): (appState: AppState) => ExchangeOffersPageResult {
    return (appState) => {
        const state = appState.exchangeOffers[exchangeOffersPageHashKeySelector(stage, params)];
        const page = state?.pages[pageKeySelector(params.skip)];

        const currentPage = Math.floor((params.skip ?? 0) / EXCHANGE_OFFERS_BASE_PAGE_SIZE) + 1;

        return {
            loading: state?.loading ?? false,
            data: page,
            params,
            total: state?.total ?? 0,
            stage,
            error: state?.error,
            pageSize: EXCHANGE_OFFERS_BASE_PAGE_SIZE,
            currentPage
        };
    };
}

const exchangeOffersPageHashKeySelector = (stage: string, { skip, ...params }: ExchangeOfferQueryParams = {}) =>
    `${stage}/hard-currency-exchange/${qs.stringify(params)}`;

const pageKeySelector = (skip?: number) => `skip = ${skip ?? 0}`;

import { Action } from "redux";

import {
    localizationListActionGroup,
    localizationListLoadingAction,
    localizationListLoadedOkAction,
    localizationListLoadedErrorAction
} from "../actions/localizationList";
import { Localization, LocalizationQueryParams } from "../../services";
import { localizationKeySelector } from "./localizationEntitiesReducer";
import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { PagingInfoSelectResult } from "shared";
import { DEFAULT_LOCALIZATION_PAGE_SIZE } from "urls";

export interface LocalizationState {
    loading: boolean;
    error?: string;
    total: number;
    pages: {
        [pageKey: string]: string[];
    };
}

export const localizationListReducer = localizationListActionGroup.hashedReducer(
    (e) => hashKeySelector(e.stage, e.params),
    (state: LocalizationState | undefined, action: Action): LocalizationState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0
            };
        }

        if (localizationListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true,
                error: undefined
            };
        }

        if (localizationListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (localizationListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: undefined,
                total: action.total,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.data.map((el) =>
                        localizationKeySelector(action.stage, el.key)
                    )
                }
            };
        }

        return state;
    }
);
export interface LocalizationListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data: Localization[];
    total: number;
}

export function localizationListSelector(
    stage: string,
    params: LocalizationQueryParams
): (appState: AppState) => LocalizationListPageResult {
    return (appState) => {
        const state = appState.localization.list[hashKeySelector(stage, params)];

        const data = state?.pages?.[pageKeySelector(params.skip)]
            ?.map((el) => appState.localization.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_LOCALIZATION_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;
        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data,
            total: state?.total ?? 0,
            currentPage,
            pageSize
        };
    };
}

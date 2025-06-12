import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";

import {
    emotionsListActionGroup,
    emotionsListLoadingAction,
    emotionsListLoadedOkAction,
    emotionsListLoadedErrorAction
} from "../actions";
import { EmotionsQueryParams } from "features/emotion-moderation/services";
import { emotionsKeySelector } from "./emotionsEntitiesReducer";

export const emotionsListReducer = createListPageHashedReducer({
    group: emotionsListActionGroup,
    loading: emotionsListLoadingAction,
    loadedError: emotionsListLoadedErrorAction,
    loadedOk: emotionsListLoadedOkAction,
    keyFactory: (stage, themeCollection) => emotionsKeySelector(stage, themeCollection.id)
});

export const emotionsListPageSelector =
    (stage: string, params: EmotionsQueryParams, withData?: boolean) => (appState: AppState) => {
        const result = appState.emotions.listPages[hashKeySelector(stage, params)];

        let data;

        if (withData) {
            data = result?.pages?.[pageKeySelector(params.skip, params.take)]
                ?.map((el) => appState.emotions?.entities[el]!)
                .filter(Boolean);
        }
        const pageSize = params.take ?? DEFAULT_THEME_COLLECTIONS_LIST_SIZE;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: result?.loading,
            error: result?.error,
            total: result?.total ?? 0,
            data,
            params,
            stage,
            pageSize,
            currentPage
        };
    };

export const emotionsByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = emotionsListPageSelector(stage, { id }, true)(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

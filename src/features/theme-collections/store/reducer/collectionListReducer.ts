import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import { ThemeCollectionsQueryParams } from "features/theme-collections/services";
import { themeCollectionKeySelector } from "./collectionEntitiesReducer";
import {
    collectionsListActionGroup,
    collectionsListLoadedErrorAction,
    collectionsListLoadedOkAction,
    collectionsListLoadingAction
} from "../actions";

export const collectionListReducer = createListPageHashedReducer({
    group: collectionsListActionGroup,
    loading: collectionsListLoadingAction,
    loadedError: collectionsListLoadedErrorAction,
    loadedOk: collectionsListLoadedOkAction,
    keyFactory: (stage, themeCollection) => themeCollectionKeySelector(stage, themeCollection.id)
});

export const themeCollectionListPageSelector =
    (stage: string, params: ThemeCollectionsQueryParams, withData?: boolean) => (appState: AppState) => {
        const result = appState.themeCollections.listPages[hashKeySelector(stage, params)];

        let data;

        if (withData) {
            data = result?.pages?.[pageKeySelector(params.skip, params.take)]
                ?.map((el) => appState.themeCollections?.entities[el]!)
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

export const themeCollectionInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = themeCollectionListPageSelector(stage, { id }, true)(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

export const themeCollectionsByWardrobeIdSelector = (stage: string, wardrobeId: number) => (appState: AppState) => {
    const info = themeCollectionListPageSelector(stage, { wardrobeId }, true)(appState);

    const data = info.data;

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

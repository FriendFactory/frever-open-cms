import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { CREATE_PAGE_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import {
    createPageListActionGroup,
    createPageListLoadedErrorAction,
    createPageListLoadedOkAction,
    createPageListLoadingAction
} from "../actions";
import { CreatePageRowQueryParams } from "features/content-moderation/services";
import { createPageKeySelector } from "./entitiesReducer";

export const listReducer = createListPageHashedReducer({
    group: createPageListActionGroup,
    loading: createPageListLoadingAction,
    loadedError: createPageListLoadedErrorAction,
    loadedOk: createPageListLoadedOkAction,
    keyFactory: (stage, createPageRow) => createPageKeySelector(stage, createPageRow.id)
});

export const createPageListPageSelector = (stage: string, params: CreatePageRowQueryParams) => (appState: AppState) => {
    const result = appState.createPage.listPages[hashKeySelector(stage, params)];

    let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
        ?.map((el) => appState.createPage?.entities[el]!)
        .filter(Boolean);

    const pageSize = params.take ?? CREATE_PAGE_LIST_SIZE;

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

export const createPageInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = createPageListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

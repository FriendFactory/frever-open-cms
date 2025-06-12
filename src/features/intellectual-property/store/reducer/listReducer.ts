import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { INTELLECTUAL_PROPERTY_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import {
    intellectualPropertyListActionGroup,
    intellectualPropertyListLoadingAction,
    intellectualPropertyListLoadedOkAction,
    intellectualPropertyListLoadedErrorAction
} from "../actions";
import { IntellectualProperty, IntellectualPropertyQueryParams } from "features/intellectual-property";
import { intellectualPropertyKeySelector } from "./entitiesReducer";

export const listReducer = createListPageHashedReducer({
    group: intellectualPropertyListActionGroup,
    loading: intellectualPropertyListLoadingAction,
    loadedError: intellectualPropertyListLoadedErrorAction,
    loadedOk: intellectualPropertyListLoadedOkAction,
    keyFactory: (stage, themeCollection) => intellectualPropertyKeySelector(stage, themeCollection.id)
});

export interface IntellectualPropertyPageSelectorType {
    stage: string;
    loading: boolean;
    error?: string;
    data?: IntellectualProperty[];
    params: IntellectualPropertyQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export const intellectualPropertyListPageSelector =
    (stage: string, params: IntellectualPropertyQueryParams) =>
    (appState: AppState): IntellectualPropertyPageSelectorType => {
        const result = appState.intellectualProperty.listPages[hashKeySelector(stage, params)];

        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.intellectualProperty?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? INTELLECTUAL_PROPERTY_LIST_SIZE;

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

export const intellectualPropertyInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = intellectualPropertyListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

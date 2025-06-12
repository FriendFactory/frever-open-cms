import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { createListPageHashedReducer } from "shared/store";
import { universeKeySelector } from "./entitiesReducer";
import {
    universeListActionGroup,
    universeListLoadingAction,
    universeListLoadedOkAction,
    universeListLoadedErrorAction
} from "../actions";
import { DEFAULT_UNIVERSE_LIST_SIZE } from "urls";
import { Universe, UniverseListQueryParams } from "features/universe-moderation/services";

export const listReducer = createListPageHashedReducer({
    group: universeListActionGroup,
    loading: universeListLoadingAction,
    loadedError: universeListLoadedErrorAction,
    loadedOk: universeListLoadedOkAction,
    keyFactory: (stage, themeCollection) => universeKeySelector(stage, themeCollection.id)
});

export interface UniverPageSelectorType {
    stage: string;
    loading: boolean;
    error?: string;
    data?: Universe[];
    params: UniverseListQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export const universeListPageSelector =
    (stage: string, params: UniverseListQueryParams) =>
    (appState: AppState): UniverPageSelectorType => {
        const result = appState.universe.listPages[hashKeySelector(stage, params)];

        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.universe?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_UNIVERSE_LIST_SIZE;

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

export const universeInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = universeListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

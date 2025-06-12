import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_WATERMARK_LIST_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import { watermarkKeySelector } from "./entitiesReducer";
import {
    watermarkListActionGroup,
    watermarkListLoadingAction,
    watermarkListLoadedOkAction,
    watermarkListLoadedErrorAction
} from "../actions";
import { Watermark, WatermarkListQueryParams } from "features/watermark-moderation/services";

export const listReducer = createListPageHashedReducer({
    group: watermarkListActionGroup,
    loading: watermarkListLoadingAction,
    loadedError: watermarkListLoadedErrorAction,
    loadedOk: watermarkListLoadedOkAction,
    keyFactory: (stage, themeCollection) => watermarkKeySelector(stage, themeCollection.id)
});

export interface WatermarkPageSelectorType {
    stage: string;
    loading: boolean;
    error?: string;
    data?: Watermark[];
    params: WatermarkListQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export const watermarkListPageSelector =
    (stage: string, params: WatermarkListQueryParams) =>
    (appState: AppState): WatermarkPageSelectorType => {
        const result = appState.watermark.listPages[hashKeySelector(stage, params)];
        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.watermark?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_WATERMARK_LIST_SIZE;

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

export const watermarkInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = watermarkListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

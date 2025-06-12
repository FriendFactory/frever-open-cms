import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { createListPageHashedReducer } from "shared/store";
import { DEFAULT_RACE_LIST_SIZE } from "urls";
import { Race, RaceListQueryParams } from "features/race-moderation/services";
import { raceKeySelector } from "./entitiesReducer";
import {
    raceListActionGroup,
    raceListLoadingAction,
    raceListLoadedOkAction,
    raceListLoadedErrorAction
} from "../actions";

export const listReducer = createListPageHashedReducer({
    group: raceListActionGroup,
    loading: raceListLoadingAction,
    loadedOk: raceListLoadedOkAction,
    loadedError: raceListLoadedErrorAction,
    keyFactory: (stage, raceEntity) => raceKeySelector(stage, raceEntity.id)
});

export interface RaceListPageSelector {
    stage: string;
    loading: boolean;
    error?: string;
    data?: Race[];
    params: RaceListQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
}

export const raceListPageSelector =
    (stage: string, params: RaceListQueryParams) =>
    (appState: AppState): RaceListPageSelector => {
        const result = appState.race.listPages[hashKeySelector(stage, params)];

        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.race?.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_RACE_LIST_SIZE;

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

export const raceInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = raceListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

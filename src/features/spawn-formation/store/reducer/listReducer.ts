import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import { calculateListTotal } from "shared/calculate-list-total";
import {
    spawnFormationListActionGroup,
    spawnFormationListLoadedErrorAction,
    spawnFormationListLoadedOkAction,
    spawnFormationListLoadingAction
} from "../actions/spawnFormationList";
import { spawnFormationKeySelector } from "./entitiesReducer";
import { SpawnFormationQueryParams } from "features/spawn-formation/services/getSpawnFormation";

export const listReducer = createListPageHashedReducer({
    group: spawnFormationListActionGroup,
    loading: spawnFormationListLoadingAction,
    loadedError: spawnFormationListLoadedErrorAction,
    loadedOk: spawnFormationListLoadedOkAction,
    keyFactory: (stage, entity) => spawnFormationKeySelector(stage, entity.id)
});

export const spawnFormationListSelector =
    (stage: string, params: SpawnFormationQueryParams) => (appState: AppState) => {
        const state = appState.spawnFormation.list[hashKeySelector(stage, params)];
        const page = state?.pages?.[pageKeySelector(params.skip)];

        const data = page?.map((el) => appState.spawnFormation.entities[el]!).filter(Boolean);

        const pageSize = Number(params?.take ?? DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE);

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            loading: state?.loading ?? false,
            error: state?.error,
            data,
            pageSize,
            currentPage,
            total: calculateListTotal(page?.length ?? 0, params.skip, pageSize)
        };
    };

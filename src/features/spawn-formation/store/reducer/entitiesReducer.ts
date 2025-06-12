import { Action } from "redux";

import { reduceState } from "utils";
import { CharacterSpawnPositionFormation } from "features/spawn-formation/services/api";
import { spawnFormationListLoadedOkAction } from "../actions/spawnFormationList";

interface SpawnFormationEntitiesState {
    [key: string]: CharacterSpawnPositionFormation | undefined;
}

export const entitiesReducer = (
    state: SpawnFormationEntitiesState | undefined,
    action: Action
): SpawnFormationEntitiesState => {
    if (!state) {
        state = {};
    }

    if (spawnFormationListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...reduceState(action.data, (id) => spawnFormationKeySelector(action.stage, id))
        };
    }

    return state;
};

export const spawnFormationKeySelector = (stage: string, id: number | string) => `${stage}/spawn-formation/${id}`;

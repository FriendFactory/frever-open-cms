import { defineAction, defineActionGroup } from "rd-redux-utils";

import { CharacterSpawnPositionFormation } from "features/spawn-formation/services/api";
import { SpawnFormationQueryParams } from "features/spawn-formation/services/getSpawnFormation";

export const spawnFormationListActionGroup =
    defineActionGroup<{ stage: string; params: SpawnFormationQueryParams }>("SPAWN FORMATION LIST");

export const spawnFormationListLoadingAction = spawnFormationListActionGroup.defineAction("LOADING");

export const spawnFormationListLoadedOkAction =
    spawnFormationListActionGroup.defineAction<{ data: CharacterSpawnPositionFormation[] }>("LOADED OK");

export const spawnFormationListLoadedErrorAction =
    spawnFormationListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const updateSpawnFormationAction =
    defineAction<{ stage: string; data: CharacterSpawnPositionFormation }>("SPAWN FORMATION UPDATE");

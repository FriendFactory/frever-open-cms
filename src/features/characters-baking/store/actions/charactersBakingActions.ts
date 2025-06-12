import { defineActionGroup } from "rd-redux-utils";

import { CharacterBakedViewStatistics } from "features/characters-baking/services/api";
import { CharactersBakingQueryParams } from "features/characters-baking/services/getCharactersBakingStatistics";

export const charactersBakingActionGroup = defineActionGroup<{ stage: string }>("CHARACTERS BAKING STATISTICS");

export const charactersBakingLoadAction =
    charactersBakingActionGroup.defineAction<{ params: CharactersBakingQueryParams }>("LOAD");

export const charactersBakingLoadingAction = charactersBakingActionGroup.defineAction("LOADING");

export const charactersBakingLoadedOkAction =
    charactersBakingActionGroup.defineAction<{ data: CharacterBakedViewStatistics }>("LOADED OK");

export const charactersBakingLoadedErrorAction =
    charactersBakingActionGroup.defineAction<{ error: string }>("LOADED ERROR");

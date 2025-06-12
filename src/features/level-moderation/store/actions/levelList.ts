import { defineActionGroup } from "rd-redux-utils";

import { Level, LevelListQueryParams } from "features/level-moderation/services";

export const levelListActionGroup = defineActionGroup<{
    stage: string;
    params: LevelListQueryParams;
}>("LEVEL LIST");

export const levelListLoadingAction = levelListActionGroup.defineAction("LOADING");

export const levelListLoadedOkAction = levelListActionGroup.defineAction<{
    result: Level[];
}>("LOADED OK");

export const levelListLoadedErrorAction = levelListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

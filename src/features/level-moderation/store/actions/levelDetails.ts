import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Level } from "features/level-moderation/services";

export const levelDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("LEVEL DETAILS");

export const levelDetailsLoadingAction = levelDetailsActionGroup.defineAction("LOADING");

export const levelDetailsLoadedOkAction = levelDetailsActionGroup.defineAction<{
    result: Level;
}>("LOADED OK");

export const levelDetailsLoadedErrorAction = levelDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const editLevelAction = defineAction<{
    stage: string;
    data: Partial<Level>;
}>("EDIT");

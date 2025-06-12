import { defineActionGroup } from "rd-redux-utils";

import { LevelEvent } from "features/level-moderation/services";

export const eventDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("EVENT DETAILS");

export const eventDetailsLoadingAction = eventDetailsActionGroup.defineAction("LOADING");

export const eventDetailsLoadedOkAction = eventDetailsActionGroup.defineAction<{
    result: LevelEvent;
}>("LOADED OK");

export const eventDetailsLoadedErrorAction = eventDetailsActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

import { defineActionGroup } from "rd-redux-utils";

import { EventOfLevel } from "features/video-moderation/services/getEventsOfLevel";

export const eventsOfLevelActionGroup = defineActionGroup<{ stage: string; levelId: number }>("EVENTS OF LEVEL");

export const eventsOfLevelLoadAction = eventsOfLevelActionGroup.defineAction("LOAD");

export const eventsOfLevelLoadingAction = eventsOfLevelActionGroup.defineAction("LOADING");

export const eventsOfLevelLoadedOkAction =
    eventsOfLevelActionGroup.defineAction<{ result: EventOfLevel[] }>("RESPONSE OK");

export const eventsOfLevelLoadedErrorAction =
    eventsOfLevelActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

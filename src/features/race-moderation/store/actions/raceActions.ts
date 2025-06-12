import { defineAction } from "rd-redux-utils";

import { Race } from "features/race-moderation/services";

export const upsertRaceAction = defineAction<{ stage: string; items: Race[] }>("UPDATE RACES");

export const upsertSingleRaceAction = defineAction<{ stage: string; data: Partial<Race> }>("UPDATE SINGLE RACE");

export const upsertRacesOkAction = defineAction<{ stage: string; data: Race[] }>("UPDATE RACES OK");

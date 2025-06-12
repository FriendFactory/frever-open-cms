import { defineActionGroup } from "rd-redux-utils";

import { Race, RaceListQueryParams } from "features/race-moderation/services";

export const raceListActionGroup = defineActionGroup<{ stage: string; params: RaceListQueryParams }>("RACE LIST");

export const raceListLoadAction = raceListActionGroup.defineAction("LOAD");

export const raceListLoadingAction = raceListActionGroup.defineAction("LOADING");

export const raceListLoadedOkAction = raceListActionGroup.defineAction<{ data: Race[]; total?: number }>("LOADED OK");

export const raceListLoadedErrorAction = raceListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

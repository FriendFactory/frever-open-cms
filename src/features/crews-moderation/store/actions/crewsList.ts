import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Crew, CrewListQueryParams } from "features/crews-moderation/services";
import { ResultWithCount } from "shared";

export const crewsListActionGroup = defineActionGroup<{ stage: string; params: CrewListQueryParams }>("CREWS LIST");

export const crewsListLoadingAction = crewsListActionGroup.defineAction("LOADING");

export const crewsListLoadedOkAction =
    crewsListActionGroup.defineAction<{ result: ResultWithCount<Crew> }>("LOADED OK");

export const crewsListLoadedErrorAction = crewsListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const updateCrewAction = defineAction<{ stage: string; data: Crew; file?: File }>("UPDATE CREW");

export const deleteCrewAction = defineAction<{ stage: string; data: Crew }>("DELETE UPDATE CREW");

export const updateCrewOkAction = defineAction<{ stage: string; result: Crew }>("UPDATE CREW OK");

import { defineActionGroup } from "rd-redux-utils";

import { SeasonBaseInfo, SeasonListQueryParams } from "features/seasons-moderation/services";
import { ResultWithCount } from "shared";

export const seasonListActionGroup = defineActionGroup<{ stage: string; params: SeasonListQueryParams }>("SEASON LIST");

export const seasonListLoadingAction = seasonListActionGroup.defineAction("LOADING");

export const seasonListLoadedOkAction =
    seasonListActionGroup.defineAction<{ result: ResultWithCount<SeasonBaseInfo> }>("RESPONSE OK");

export const seasonListLoadedErrorAction = seasonListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

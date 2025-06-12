import { defineActionGroup } from "rd-redux-utils";

import { Universe, UniverseListQueryParams } from "features/universe-moderation/services";

export const universeListActionGroup =
    defineActionGroup<{ stage: string; params: UniverseListQueryParams }>("UNIVERSE LIST");

export const universeListLoadAction = universeListActionGroup.defineAction("LOAD");

export const universeListLoadingAction = universeListActionGroup.defineAction("LOADING");

export const universeListLoadedOkAction =
    universeListActionGroup.defineAction<{ data: Universe[]; total?: number }>("LOADED OK");

export const universeListLoadedErrorAction = universeListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

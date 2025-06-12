import { defineActionGroup } from "rd-redux-utils";

import { OutfitListQueryParams, Outfit } from "../../services";

export const outfitListActionGroup = defineActionGroup<{ stage: string; params: OutfitListQueryParams }>("OUTFIT LIST");

export const outfitListLoadingAction = outfitListActionGroup.defineAction("LOADING");

export const outfitListLoadedOkAction = outfitListActionGroup.defineAction<{ result: Outfit[] }>("LOADED OK");

export const outfitListLoadedErrorAction = outfitListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

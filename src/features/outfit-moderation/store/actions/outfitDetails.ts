import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Outfit } from "../../services";

export const outfitDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("OUTFIT DETAILS");

export const outfitDetailsLoadingAction = outfitDetailsActionGroup.defineAction("LOADING");

export const outfitDetailsLoadedOkAction = outfitDetailsActionGroup.defineAction<{ result: Outfit }>("LOADED OK");

export const outfitDetailsLoadedErrorAction = outfitDetailsActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const removeOutfitWardrobeAction =
    defineAction<{ stage: string; wardrobeId: number; outfitId: number }>("REMOVE OUTFIT WARDROBE");

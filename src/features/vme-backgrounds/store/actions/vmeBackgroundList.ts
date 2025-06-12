import { VMEBackground, VMEBackgroundQueryParams } from "features/vme-backgrounds/services";
import { defineActionGroup } from "rd-redux-utils";

export const vmeBackgroundListActionGroup =
    defineActionGroup<{ stage: string; params: VMEBackgroundQueryParams }>("VME BACKGROUND LIST");

export const vmeBackgroundListLoadingAction = vmeBackgroundListActionGroup.defineAction("LOADING");

export const vmeBackgroundListLoadedOkAction =
    vmeBackgroundListActionGroup.defineAction<{ data: VMEBackground[] }>("LOADED OK");

export const vmeBackgroundListLoadedErrorAction =
    vmeBackgroundListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

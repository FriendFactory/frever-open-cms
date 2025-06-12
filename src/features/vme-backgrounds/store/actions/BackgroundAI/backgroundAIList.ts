import { defineActionGroup } from "rd-redux-utils";

import { BackgroundAI } from "features/vme-backgrounds/services";
import { BackgroundAIQueryParams } from "features/vme-backgrounds/services/BackgroundAI/getBackgroundsAI";

export const backgroundAIListActionGroup =
    defineActionGroup<{ stage: string; params: BackgroundAIQueryParams }>("VME BACKGROUND AI LIST");

export const backgroundAIListLoadingAction = backgroundAIListActionGroup.defineAction("LOADING");

export const backgroundAIListLoadedOkAction =
    backgroundAIListActionGroup.defineAction<{ data: BackgroundAI[] }>("LOADED OK");

export const backgroundAIListLoadedErrorAction =
    backgroundAIListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

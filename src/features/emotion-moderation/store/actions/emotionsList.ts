import { defineActionGroup } from "rd-redux-utils";

import { Emotion, EmotionsQueryParams } from "features/emotion-moderation/services";

export const emotionsListActionGroup =
    defineActionGroup<{ stage: string; params: EmotionsQueryParams }>("EMOTIONS LIST");

export const emotionsListLoadAction = emotionsListActionGroup.defineAction("LOAD");

export const emotionsListLoadingAction = emotionsListActionGroup.defineAction("LOADING");

export const emotionsListLoadedOkAction =
    emotionsListActionGroup.defineAction<{ data: Emotion[]; total?: number }>("LOADED OK");

export const emotionsListLoadedErrorAction = emotionsListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

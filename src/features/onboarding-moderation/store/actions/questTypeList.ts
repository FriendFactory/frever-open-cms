import { defineActionGroup } from "rd-redux-utils";

export const questTypeListActionGroup = defineActionGroup<{
    stage: string;
}>("ONBOARDING QUEST TYPE LIST");

export const questTypeListLoadingAction = questTypeListActionGroup.defineAction("LOADING");

export const questTypeListLoadedOkAction = questTypeListActionGroup.defineAction<{ data: string[] }>("LOADED OK");

export const questTypeListLoadedErrorAction = questTypeListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

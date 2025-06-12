import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { OnboardingQuest, QuestListQueryParams } from "features/onboarding-moderation/services";

export const questListActionGroup = defineActionGroup<{
    stage: string;
    params: QuestListQueryParams;
}>("ONBOARDING QUEST LIST");

export const questListLoadingAction = questListActionGroup.defineAction("LOADING");

export const questListLoadedOkAction = questListActionGroup.defineAction<{
    result: ResultWithCount<OnboardingQuest>;
}>("LOADED OK");

export const questListLoadedErrorAction = questListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { OnboardingQuestGroup, QuestGroupListQueryParams } from "features/onboarding-moderation/services";

export const questGroupListActionGroup = defineActionGroup<{
    stage: string;
    params: QuestGroupListQueryParams;
}>("ONBOARDING QUEST GROUP LIST");

export const questGroupListLoadingAction = questGroupListActionGroup.defineAction("LOADING");

export const questGroupListLoadedOkAction = questGroupListActionGroup.defineAction<{
    result: ResultWithCount<OnboardingQuestGroup>;
}>("LOADED OK");

export const questGroupListLoadedErrorAction = questGroupListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

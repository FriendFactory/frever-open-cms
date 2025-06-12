import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { OnboardingReward, RewardListQueryParams } from "features/onboarding-moderation/services";

export const rewardListActionGroup = defineActionGroup<{
    stage: string;
    params: RewardListQueryParams;
}>("ONBOARDING REWARD LIST");

export const rewardListLoadingAction = rewardListActionGroup.defineAction("LOADING");

export const rewardListLoadedOkAction = rewardListActionGroup.defineAction<{
    result: ResultWithCount<OnboardingReward>;
}>("LOADED OK");

export const rewardListLoadedErrorAction = rewardListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

import { OnboardingData, OnboardingDataNames } from "features/onboarding-moderation/services";
import { defineAction } from "rd-redux-utils";

export const updateEntityListAction = defineAction<{
    stage: string;
    entityType: OnboardingDataNames;
    entity: Partial<OnboardingData[OnboardingDataNames]["data"]>;
    thumbnail?: File;
}>("UPDATE ONBOARDING ENTITY");

export const loadEntityListAction = defineAction<{
    stage: string;
    params: OnboardingData[OnboardingDataNames]["queryParams"];
    entityType: OnboardingDataNames;
}>("LOAD ONBOARDING ENTITY");

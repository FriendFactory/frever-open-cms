import { BASE_PAGE_URL } from "urls";

import { QuestGroupListQueryParams } from "features/onboarding-moderation";

export const ONBOARDING_BASE_PAGE_URL = BASE_PAGE_URL.createChildPath("onboarding");

export const ONBOARDING_QUEST_GROUP_BASE_PAGE_URL = ONBOARDING_BASE_PAGE_URL.createChildPath<{}, {}>("quest-group");

export const ONBOARDING_QUEST_GROUP_LIST_PAGE_URL = ONBOARDING_QUEST_GROUP_BASE_PAGE_URL.createChildPath<
    {},
    QuestGroupListQueryParams
>("list");

export const ONBOARDING_DETAILS_PAGE_URL = ONBOARDING_QUEST_GROUP_BASE_PAGE_URL.createChildPath<{ id: number }, {}>(
    "details/:id"
);

export const ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE = 50;
export const ONBOARDING_QUEST_LIST_PAGE_SIZE = 10;
export const ONBOARDING_REWARD_LIST_PAGE_SIZE = 10;

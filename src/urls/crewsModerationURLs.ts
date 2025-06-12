import { BASE_PAGE_URL } from "urls";
import { CrewListQueryParams, CrewRewardsQueryParams } from "features/crews-moderation";

export const CREWS_BASE_URL = BASE_PAGE_URL.createChildPath("crews");
export const CREWS_LIST_PAGE_URL = CREWS_BASE_URL.createChildPath<{}, CrewListQueryParams>("list");
export const CREW_DETAILS_PAGE_URL = CREWS_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const CREW_REWARDS_BASE_URL = BASE_PAGE_URL.createChildPath("crew-rewards");
export const CREW_REWARDS_LIST_URL = CREW_REWARDS_BASE_URL.createChildPath<{}, CrewRewardsQueryParams>("list");

export const DEFAULT_CREW_REWARDS_PAGE_SIZE = 50;
export const CREWS_LIST_BASE_PAGE_SIZE = 50;

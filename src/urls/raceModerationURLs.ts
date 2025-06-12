import { BASE_PAGE_URL } from "urls";
import { RaceListQueryParams } from "features/race-moderation";

export const RACE_BASE_URL = BASE_PAGE_URL.createChildPath("race");

export const RACE_LIST_URL = RACE_BASE_URL.createChildPath<{}, RaceListQueryParams>("list");

export const RACE_DETAILS_URL = RACE_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_RACE_LIST_SIZE = 100;

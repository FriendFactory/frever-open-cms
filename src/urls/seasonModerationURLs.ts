import { BASE_PAGE_URL } from "urls";
import { SeasonListQueryParams } from "features/seasons-moderation/services";

export const SEASON_BASE_URL = BASE_PAGE_URL.createChildPath("seasons");

export const SEASON_LIST_PAGE_URL = SEASON_BASE_URL.createChildPath<{}, SeasonListQueryParams>("search");
export const SEASON_DETAILS_PAGE_URL = SEASON_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_SEASON_LIST_PAGE_SIZE = 20;

import { BASE_PAGE_URL } from "urls";
import { UniverseListQueryParams } from "features/universe-moderation";

export const UNIVERSE_BASE_URL = BASE_PAGE_URL.createChildPath("universe");

export const UNIVERSE_LIST_URL = UNIVERSE_BASE_URL.createChildPath<{}, UniverseListQueryParams>("list");

export const UNIVERSE_DETAILS_URL = UNIVERSE_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_UNIVERSE_LIST_SIZE = 100;

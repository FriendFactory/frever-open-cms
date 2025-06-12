import { BASE_PAGE_URL } from "urls";

export const SPAWN_FORMATION_BASE_PAGE_URL = BASE_PAGE_URL.createChildPath("spawn-formation");

export const SPAWN_FORMATION_LIST_PAGE_URL = SPAWN_FORMATION_BASE_PAGE_URL.createChildPath<{}, {}>("list");

export const SPAWN_FORMATION_DETAILS_PAGE_URL = SPAWN_FORMATION_BASE_PAGE_URL.createChildPath<{ id: number }, {}>(
    "details/:id"
);

export const DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE = 100;

import { ThemeCollectionsQueryParams } from "features/theme-collections";
import { BASE_PAGE_URL } from "urls";

export const THEME_COLLECTIONS_BASE_URL = BASE_PAGE_URL.createChildPath("theme-collections");

export const THEME_COLLECTIONS_LIST_URL = THEME_COLLECTIONS_BASE_URL.createChildPath<{}, ThemeCollectionsQueryParams>(
    "list"
);

export const THEME_COLLECTIONS_DETAILS_URL = THEME_COLLECTIONS_BASE_URL.createChildPath<{ id: number }, {}>(
    "details/:id"
);

export const DEFAULT_THEME_COLLECTIONS_LIST_SIZE = 100;

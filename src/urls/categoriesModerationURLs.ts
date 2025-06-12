import { CategoryTypes } from "config";
import { BASE_PAGE_URL } from "urls";
import { GeoClustersListQueryParams } from "features/categories-moderation";

export const CATEGORY_BASE_URL = BASE_PAGE_URL.createChildPath("categories");

export const CATEGORY_LIST_URL = CATEGORY_BASE_URL.createChildPath<{ category: CategoryTypes }, {}>(":category");

export const UMA_SHARED_COLOR_DETAILS_URL = CATEGORY_BASE_URL.createChildPath<{ id: number }, {}>(
    "uma-shared-color-details/:id"
);

export const EDITOR_SETTINGS_BASE_URL = BASE_PAGE_URL.createChildPath("editor-settings");

export const EDITOR_SETTINGS_LIST_URL = EDITOR_SETTINGS_BASE_URL.createChildPath("list");

export const EDITOR_SETTINGS_DETAILS_URL = EDITOR_SETTINGS_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const GEO_CLUSTERS_BASE_URL = BASE_PAGE_URL.createChildPath("geo-clusters");

export const GEO_CLUSTERS_LIST_URL = GEO_CLUSTERS_BASE_URL.createChildPath<{}, GeoClustersListQueryParams>("list");

export const GEO_CLUSTER_DETAILS_URL = GEO_CLUSTERS_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const GEO_CLUSTER_LIST_DEFAULT_SIZE = 100;

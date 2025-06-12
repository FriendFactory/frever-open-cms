import { BASE_PAGE_URL } from "urls";
import { TagFilterParams } from "features/tag-moderation/containers/TagFilterFormContainer";
import { TagAssetListFilterParams } from "features/search-assets/containers/TagAssetList/TagAssetListFilterFormContainer";

export const TAG_BASE_URL = BASE_PAGE_URL.createChildPath("tags");

export const TAG_LIST_PAGE_URL = TAG_BASE_URL.createChildPath<{}, TagFilterParams>("list");

export const TAG_DETAILS_PAGE_URL = TAG_BASE_URL.createChildPath<{ id: number }, TagAssetListFilterParams>(
    ":id/details"
);

export const DEFAULT_TAG_LIST_SIZE = 50;
export const DEFAULT_TAG_ASSET_LIST_SIZE = 50;

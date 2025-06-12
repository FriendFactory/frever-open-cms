import { BASE_PAGE_URL } from "urls";
import { GetHashtagListParams } from "features/hashtag-moderation/services";

export const HASHTAG_BASE_URL = BASE_PAGE_URL.createChildPath("hashtag");

export const HASHTAG_LIST_PAGE_URL = HASHTAG_BASE_URL.createChildPath<{}, GetHashtagListParams>("list");

export const HASHTAG_SORTING_PAGE_URL = HASHTAG_BASE_URL.createChildPath<{}, GetHashtagListParams>("sorting");

export const DEFAULT_HASHTAG_LIST_SIZE = 100;

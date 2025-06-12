import { EmotionsQueryParams } from "features/emotion-moderation/services";
import { BASE_PAGE_URL } from "urls";

export const EMOTIONS_BASE_URL = BASE_PAGE_URL.createChildPath("emotions");

export const EMOTIONS_LIST_URL = EMOTIONS_BASE_URL.createChildPath<{}, EmotionsQueryParams>("list");

export const EMOTIONS_DETAILS_URL = EMOTIONS_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_EMOTIONS_LIST_SIZE = 100;

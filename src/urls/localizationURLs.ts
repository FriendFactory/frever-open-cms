import { LocalizationQueryParams } from "features/localization-moderation/services";
import { BASE_PAGE_URL } from "urls";

export const LOCALIZATION_BASE_URL = BASE_PAGE_URL.createChildPath("localization");

export const LOCALIZATION_LIST_URL = LOCALIZATION_BASE_URL.createChildPath<{}, LocalizationQueryParams>("list");

export const DEFAULT_LOCALIZATION_PAGE_SIZE = 50;

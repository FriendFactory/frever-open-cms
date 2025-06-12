import { BASE_PAGE_URL } from "urls";
import { DeviceBlacklistQueryParams } from "features/blacklist-moderation";

export const DEVICE_BLACKLIST_BASE_URL = BASE_PAGE_URL.createChildPath("device-blacklist");

export const DEVICE_BLACKLIST_LIST_URL = DEVICE_BLACKLIST_BASE_URL.createChildPath<{}, DeviceBlacklistQueryParams>(
    "list"
);

export const DEFAULT_DEVICE_BLACKLIST_LIST_SIZE = 100;

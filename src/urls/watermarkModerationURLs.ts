import { BASE_PAGE_URL } from "urls";
import { WatermarkListQueryParams } from "features/watermark-moderation";

export const WATERMARK_BASE_URL = BASE_PAGE_URL.createChildPath("watermark");

export const WATERMARK_LIST_URL = WATERMARK_BASE_URL.createChildPath<{}, WatermarkListQueryParams>("list");

export const WATERMARK_DETAILS_URL = WATERMARK_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_WATERMARK_LIST_SIZE = 100;

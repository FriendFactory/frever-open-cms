import { GetReportedVideoListParams } from "features/reported-videos/services";
import { BASE_PAGE_URL } from "urls";

export const REPORTED_VIDEO_BASE_URL = BASE_PAGE_URL.createChildPath("reported-videos");

export const REPORTED_VIDEO_LIST_URL = REPORTED_VIDEO_BASE_URL.createChildPath<{}, GetReportedVideoListParams>("list");

export const DEFAULT_REPORTED_VIDEO_PAGE_SIZE = 100;

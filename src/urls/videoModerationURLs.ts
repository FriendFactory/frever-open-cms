import { BASE_PAGE_URL } from "urls";
import { VideoCommentsQueryParams } from "features/video-comments/services";
import { GetVideoListParams } from "features/video-moderation/services";

export const VIDEO_MODERATION_BASE_URL = BASE_PAGE_URL.createChildPath("video-moderation");

export const VIDEO_MODERATION_LIST_URL = VIDEO_MODERATION_BASE_URL.createChildPath<{}, GetVideoListParams>("list");

export const VIDEO_MODERATION_DETAILS_URL = VIDEO_MODERATION_BASE_URL.createChildPath<
    { id: number },
    GetVideoListParams
>("detais/:id");

export const VIDEO_MODERATION_COMMENTS_URL = VIDEO_MODERATION_BASE_URL.createChildPath<
    { id: number },
    VideoCommentsQueryParams
>("comments/:id");

export const COLD_START_URL = BASE_PAGE_URL.createChildPath<{}, GetVideoListParams>("cold-start");

export const DEFAULT_VIDEO_PAGE_SIZE = 120;
export const DEFAULT_COMMENT_PAGE_SIZE = 100;

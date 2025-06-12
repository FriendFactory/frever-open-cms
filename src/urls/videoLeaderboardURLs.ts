import { BASE_PAGE_URL } from "urls";
import { VideoLeaderboardQueryParams } from "features/video-leaderboard/services";

export const VIDEO_LEADERBOARD_BASE_URL = BASE_PAGE_URL.createChildPath("video-leaderboard");

export const VIDEO_LEADERBOARD_LIST_URL = VIDEO_LEADERBOARD_BASE_URL.createChildPath<{}, VideoLeaderboardQueryParams>(
    "list"
);

export const DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE = 50;

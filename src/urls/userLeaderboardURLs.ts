import { BASE_PAGE_URL } from "urls";
import { GetLeaderboardListParams } from "features/user-leaderboard/services";

export const USER_LEADERBOARD_BASE_URL = BASE_PAGE_URL.createChildPath("leaderboard");

export const USER_LEADERBOARD_LIST_URL = USER_LEADERBOARD_BASE_URL.createChildPath<{}, GetLeaderboardListParams>(
    "list"
);

export const DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE = 50;

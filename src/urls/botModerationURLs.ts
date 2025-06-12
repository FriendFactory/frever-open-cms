import { BotCommentListQueryParams, BotListQueryParams } from "features/bots-moderation/services";
import { BASE_PAGE_URL } from "urls";

export const BOT_BASE_PAGE_URL = BASE_PAGE_URL.createChildPath("automated-accounts");

export const BOT_LIST_PAGE_URL = BOT_BASE_PAGE_URL.createChildPath<{}, BotListQueryParams>("list");

export const BOT_COMMENT_BASE_PAGE_URL = BASE_PAGE_URL.createChildPath<{}, any>("automated-comments");

export const BOT_COMMENT_LIST_PAGE_URL = BOT_COMMENT_BASE_PAGE_URL.createChildPath<{}, BotCommentListQueryParams>(
    "list"
);

export const BOT_DETAILS_PAGE_URL = BOT_BASE_PAGE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_BOT_LIST_PAGE_SIZE = 100;
export const DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE = 100;

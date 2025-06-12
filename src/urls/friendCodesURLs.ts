import { BASE_PAGE_URL } from "urls";
import { CreatorCodesQueryParams, CreatorWelcomeMessagesQueryParams } from "features/friend-codes/services";

export const CREATOR_CODES_BASE_PAGE = BASE_PAGE_URL.createChildPath("star-creator-codes");
export const CREATOR_CODES_LIST_PAGE = CREATOR_CODES_BASE_PAGE.createChildPath<{}, CreatorCodesQueryParams>("list");

export const CREATOR_MESSAGES_BASE_PAGE = BASE_PAGE_URL.createChildPath("invitations");
export const CREATOR_WELCOME_MESSAGES_PAGE = CREATOR_MESSAGES_BASE_PAGE.createChildPath<
    {},
    CreatorWelcomeMessagesQueryParams
>("list");

export const DEFAULT_CREATOR_CODES_LIST_PAGE_SIZE = 100;

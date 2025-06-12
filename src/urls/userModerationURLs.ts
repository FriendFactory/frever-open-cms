import { GetUserListParams } from "features/user-moderation/services";
import { BASE_PAGE_URL } from "urls";

export type UserPageSelector = "id" | "mainGroupId";

export const USER_MODERATION_BASE_URL = BASE_PAGE_URL.createChildPath("user-moderation");

export const USER_MODERATION_LIST_URL = USER_MODERATION_BASE_URL.createChildPath<{}, GetUserListParams>("list");

export const LEVEL_DETAILS_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("level/:id");

export const USERSOUND_DETAILS_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("user-sound/:id");

export const PHOTO_DETAILS_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("photo/:id");

export const VIDEOCLIP_DETAILS_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("video-clip/:id");

export const OUTFIT_DETAILS_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("outfit/:id");

export const USER_DETAILS_BASE_URL = USER_MODERATION_BASE_URL.createChildPath<
    { selector: UserPageSelector; id: number },
    {}
>(":selector=:id");

export const EVENT_DETAILS_PAGE_URL = USER_MODERATION_BASE_URL.createChildPath<{ id: number }, {}>("event/:id");

export const DEFAULT_USER_LIST_PAGE_SIZE = 50;

import { USER_DETAILS_BASE_URL } from "urls";
import {
    GetUserListParams,
    PurchasedAssetsQueryParams,
    UserActivityQueryParams
} from "features/user-moderation/services";
import { VideoCommentsQueryParams } from "features/video-comments/services";
import { UserPurchaseHistoryQueryParams } from "features/purchase-history/services";
import { OutfitListQueryParams } from "features/outfit-moderation/services";
import { GetUserSoundParams, GetUserVideoClipParams, GetUserPhotoParams } from "features/user-media/services";
import { LevelListQueryParams } from "features/level-moderation/services";

export type UserFollowerPageType = "following" | "followers";

export const USER_DETAILS_INFO_URL = USER_DETAILS_BASE_URL.createChildPath("details");

export const USER_FOLLOWER_LIST_URL = USER_DETAILS_BASE_URL.createChildPath<
    { page: UserFollowerPageType; selector: "mainGroupId" },
    GetUserListParams
>("subscriptions/:page");

export const USER_LEVEL_LIST_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, LevelListQueryParams>("levels");

export const USER_OUTFIT_LIST_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, OutfitListQueryParams>("outfits");

export const USER_SOUND_LIST_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, GetUserSoundParams>("sounds");

export const USER_VIDEOCLIP_LIST_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, GetUserVideoClipParams>(
    "video-clip"
);

export const USER_PHOTO_LIST_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, GetUserPhotoParams>("photo");

export const USER_ASSET_PURCHASES_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<{}, PurchasedAssetsQueryParams>(
    "asset-purchases"
);

export const USER_PURCHASE_HISTORY_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<
    { selector: "mainGroupId" },
    UserPurchaseHistoryQueryParams
>("purchase-history");

export const USER_COMMENTS_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<
    { selector: "mainGroupId" },
    VideoCommentsQueryParams
>("user-video-comments");

export const USER_ACTIVITY_TAB_URL = USER_DETAILS_BASE_URL.createChildPath<
    { selector: "mainGroupId" },
    UserActivityQueryParams
>("user-activity");

export const DEFAULT_LEVEL_LIST_PAGE_SIZE = 50;
export const DEFAULT_PURCHASES_LIST_PAGE_SIZE = 50;
export const DEFAULT_PURCHASE_HISTORY_LIST_PAGE_SIZE = 100;
export const DEFAULT_OUTFIT_LIST_PAGE_SIZE = 50;
export const DEFAULT_USER_COMMENT_LIST_PAGE_SIZE = 100;
export const DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE = 100;

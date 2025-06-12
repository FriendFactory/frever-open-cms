import React from "react";
import { Redirect, Route } from "react-router";

import {
    USER_MODERATION_LIST_URL,
    USER_LEVEL_LIST_TAB_URL,
    USER_OUTFIT_LIST_TAB_URL,
    USER_DETAILS_INFO_URL,
    USER_DETAILS_BASE_URL,
    OUTFIT_DETAILS_URL,
    USER_FOLLOWER_LIST_URL,
    LEVEL_DETAILS_URL,
    EVENT_DETAILS_PAGE_URL,
    USER_SOUND_LIST_TAB_URL,
    USER_VIDEOCLIP_LIST_TAB_URL,
    USER_PHOTO_LIST_TAB_URL,
    USERSOUND_DETAILS_URL,
    PHOTO_DETAILS_URL,
    VIDEOCLIP_DETAILS_URL,
    USER_ASSET_PURCHASES_TAB_URL,
    USER_COMMENTS_TAB_URL,
    USER_PURCHASE_HISTORY_TAB_URL,
    USER_LEADERBOARD_LIST_URL,
    USER_ACTIVITY_TAB_URL
} from "urls";
import {
    UserModerationListPage,
    UserInfoPage,
    UserLevelListPage,
    UserOutfitListPage,
    OutfitDetailsPage,
    UserFollowerListPage,
    LevelDetailsPage,
    EventDetailsPage,
    UserSoundListPage,
    UserVideoClipListPage,
    UserPhotoListPage,
    UserSoundDetailsPage,
    VideoClipDetailsPage,
    PhotoDetailsPage,
    UserPurchasesListPage,
    UserCommentsPage,
    UserLeaderboardListPage,
    UserActivityPage,
    PurchaseHistoryPage
} from "pages";
import { renderProtectedPageElement } from "shared";

export const UserModerationRoutes = [
    <Route
        key="user-activity-page"
        path={USER_ACTIVITY_TAB_URL.urlTemplate}
        render={renderProtectedPageElement("Social", UserActivityPage)}
    />,
    <Route
        key="user-leaderboard-page"
        path={USER_LEADERBOARD_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Social", UserLeaderboardListPage)}
    />,
    <Route
        key="event-details-page"
        render={renderProtectedPageElement("Social", EventDetailsPage)}
        path={EVENT_DETAILS_PAGE_URL.urlTemplate}
    />,
    <Route
        key="user-purchases-list-page"
        render={renderProtectedPageElement("Social", UserPurchasesListPage)}
        path={USER_ASSET_PURCHASES_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-purchases-history-page"
        render={renderProtectedPageElement("Social", PurchaseHistoryPage)}
        path={USER_PURCHASE_HISTORY_TAB_URL.urlTemplate}
    />,
    <Route
        key="sound-details-page"
        render={renderProtectedPageElement("Social", UserSoundDetailsPage)}
        path={USERSOUND_DETAILS_URL.urlTemplate}
    />,
    <Route
        key="photo-details-page"
        render={renderProtectedPageElement("Social", PhotoDetailsPage)}
        path={PHOTO_DETAILS_URL.urlTemplate}
    />,
    <Route
        key="video-clip-details-page"
        render={renderProtectedPageElement("Social", VideoClipDetailsPage)}
        path={VIDEOCLIP_DETAILS_URL.urlTemplate}
    />,
    <Route
        key="level-details-page"
        render={renderProtectedPageElement("Social", LevelDetailsPage)}
        path={LEVEL_DETAILS_URL.urlTemplate}
    />,
    <Route
        key="outfit-details-page"
        render={renderProtectedPageElement("Social", OutfitDetailsPage)}
        path={OUTFIT_DETAILS_URL.urlTemplate}
    />,
    <Route
        key="user-video-clip-list-page"
        path={USER_VIDEOCLIP_LIST_TAB_URL.urlTemplate}
        render={renderProtectedPageElement("Social", UserVideoClipListPage)}
    />,
    <Route
        key="user-comment-list-page"
        render={renderProtectedPageElement("Social", UserCommentsPage)}
        path={USER_COMMENTS_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-photo-list-page"
        render={renderProtectedPageElement("Social", UserPhotoListPage)}
        path={USER_PHOTO_LIST_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-sound-list-page"
        render={renderProtectedPageElement("Social", UserSoundListPage)}
        path={USER_SOUND_LIST_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-level-list-page"
        render={renderProtectedPageElement("Social", UserLevelListPage)}
        path={USER_LEVEL_LIST_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-follower-list-page"
        render={renderProtectedPageElement("Social", UserFollowerListPage)}
        path={USER_FOLLOWER_LIST_URL.urlTemplate}
    />,
    <Route
        key="user-outfit-list-page"
        render={renderProtectedPageElement("Social", UserOutfitListPage)}
        path={USER_OUTFIT_LIST_TAB_URL.urlTemplate}
    />,
    <Route
        key="user-details-info-page"
        render={renderProtectedPageElement("Social", UserInfoPage)}
        path={USER_DETAILS_INFO_URL.urlTemplate}
    />,
    <Redirect
        key="redirect-to-user-details-info-page"
        from={USER_DETAILS_BASE_URL.urlTemplate}
        to={USER_DETAILS_INFO_URL.urlTemplate}
    />,
    <Route
        key="user-list-page"
        render={renderProtectedPageElement("Social", UserModerationListPage)}
        path={USER_MODERATION_LIST_URL.urlTemplate}
    />
];

import React from "react";
import { Route } from "react-router";

import {
    ReportVideoListPage,
    VideoCommentsPage,
    VideoDetailsPage,
    VideoLeaderboardListPage,
    VideoModerationListPage
} from "pages";
import {
    VIDEO_MODERATION_DETAILS_URL,
    VIDEO_MODERATION_LIST_URL,
    VIDEO_MODERATION_COMMENTS_URL,
    VIDEO_LEADERBOARD_LIST_URL,
    REPORTED_VIDEO_LIST_URL,
    COLD_START_URL
} from "urls";
import { renderProtectedPageElement } from "shared";
import { ColdStartPage } from "pages/video-pages/ColdStartPage";

export const VideoModerationRoutes = [
    <Route
        key="video-moderation-details-info-page"
        path={VIDEO_MODERATION_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", VideoDetailsPage)}
    />,
    <Route
        key="video-moderation-details-comments-page"
        path={VIDEO_MODERATION_COMMENTS_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", VideoCommentsPage)}
    />,
    <Route
        key="video-moderation-list-page"
        path={VIDEO_MODERATION_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", VideoModerationListPage)}
    />,
    <Route
        key="cold-start-page"
        path={COLD_START_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", ColdStartPage)}
    />,
    <Route
        key="video-leaderboard-page"
        path={VIDEO_LEADERBOARD_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", VideoLeaderboardListPage)}
    />,
    <Route
        key="reported-video-list-page"
        path={REPORTED_VIDEO_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", ReportVideoListPage)}
    />
];

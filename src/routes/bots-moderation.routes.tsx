import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { BOT_COMMENT_LIST_PAGE_URL, BOT_DETAILS_PAGE_URL, BOT_LIST_PAGE_URL } from "urls/botModerationURLs";
import { BotListPage } from "pages/bots-pages/BotListPage";
import { BotInfoPage } from "pages/bots-pages/BotInfoPage";
import { BotCommentListPage } from "pages/bots-pages/BotCommentListPage";

export const BotsModerationRoutes = [
    <Route
        key="bot-details-page"
        path={BOT_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", BotInfoPage)}
    />,
    <Route
        key="bot-comment-list-page"
        path={BOT_COMMENT_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", BotCommentListPage)}
    />,
    <Route
        key="bot-list-page"
        path={BOT_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", BotListPage)}
    />
];

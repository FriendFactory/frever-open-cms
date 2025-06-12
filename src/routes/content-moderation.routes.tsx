import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { CREATE_PAGE_LIST_URL, CREATE_PAGE_DETAILS_URL } from "urls";
import { ContentRowListPage, ContentRowDetailsPage } from "pages/content-moderation-pages";

export const ContentModerationRoutes = [
    <Route
        key="content-moderation-list-page"
        path={CREATE_PAGE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", ContentRowListPage)}
    />,
    <Route
        key="content-moderation-details-page"
        path={CREATE_PAGE_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", ContentRowDetailsPage)}
    />
];

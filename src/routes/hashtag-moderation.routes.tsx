import React from "react";
import { Route } from "react-router";

import { HashtagListPage, HashtagSortingPage } from "pages";
import { HASHTAG_LIST_PAGE_URL, HASHTAG_SORTING_PAGE_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const HashtagRoutes = [
    <Route
        key="hashtag-list-page"
        path={HASHTAG_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", HashtagListPage)}
    />,
    <Route
        key="hashtag-sorting-page"
        path={HASHTAG_SORTING_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", HashtagSortingPage)}
    />
];

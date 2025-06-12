import React from "react";
import { Route } from "react-router";

import { SeasonListPage, SeasonDetailsPage } from "pages";
import { SEASON_LIST_PAGE_URL, SEASON_DETAILS_PAGE_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const SeasonModerationRoutes = [
    <Route
        key="season-details-page"
        path={SEASON_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Seasons", SeasonDetailsPage)}
    />,
    <Route
        key="season-list-page"
        path={SEASON_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Seasons", SeasonListPage)}
    />
];

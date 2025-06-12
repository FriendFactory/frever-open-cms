import React from "react";
import { Route } from "react-router";

import { CrewsRewardsPage } from "pages";
import { renderProtectedPageElement } from "shared";
import { CREW_REWARDS_LIST_URL, CREWS_LIST_PAGE_URL, CREW_DETAILS_PAGE_URL } from "urls";
import { CrewsDetailsPage, CrewsListPage } from "pages";

export const CrewRoutes = [
    <Route
        key="crews-details-page"
        path={CREW_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CrewsDetailsPage)}
    />,
    <Route
        key="crews-list-page"
        path={CREWS_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CrewsListPage)}
    />,
    <Route
        key="crew-rewards-list-page"
        path={CREW_REWARDS_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CrewsRewardsPage)}
    />
];

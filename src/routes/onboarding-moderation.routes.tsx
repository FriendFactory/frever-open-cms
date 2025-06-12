import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { ONBOARDING_QUEST_GROUP_LIST_PAGE_URL, ONBOARDING_DETAILS_PAGE_URL } from "urls";

import { QuestGroupDetailsPage, QuestGroupListPage } from "pages";

export const OnboardingModerationRoutes = [
    <Route
        key="onboarding-quest-group-list-page"
        path={ONBOARDING_QUEST_GROUP_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Seasons", QuestGroupListPage)}
    />,
    <Route
        key="onboarding-details-page"
        path={ONBOARDING_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Seasons", QuestGroupDetailsPage)}
    />
];

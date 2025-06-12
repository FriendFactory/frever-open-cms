import React from "react";
import { Route } from "react-router";

import {
    VME_BACKGROUND_LIST_URL,
    VME_BACKGROUND_DETAILS_URL,
    BACKGROUND_AI_LIST_URL,
    BACKGROUND_AI_DETAILS_URL
} from "urls";
import { renderProtectedPageElement } from "shared";
import {
    BackgroundAIDetailsPage,
    BackgroundAIListPage,
    VMEBackgroundDetailsPage,
    VMEBackgroundListPage
} from "pages/vme-background-pages";

export const VMEBackgroundRoutes = [
    <Route
        key="vme-background-details-page"
        path={VME_BACKGROUND_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", VMEBackgroundDetailsPage)}
    />,
    <Route
        key="vme-background-list-page"
        path={VME_BACKGROUND_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", VMEBackgroundListPage)}
    />,
    <Route
        key="vme-background-AI-list-page"
        path={BACKGROUND_AI_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", BackgroundAIListPage)}
    />,
    <Route
        key="vme-background-AI-details-page"
        path={BACKGROUND_AI_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", BackgroundAIDetailsPage)}
    />
];

import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { EMOTIONS_DETAILS_URL, EMOTIONS_LIST_URL } from "urls";

import { EmotionsListPage, EmotionsDetailsPage } from "pages";

export const EmotionsRoutes = [
    <Route
        key="emotion-details-page"
        path={EMOTIONS_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", EmotionsDetailsPage)}
    />,
    <Route
        key="emotion-list-page"
        path={EMOTIONS_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", EmotionsListPage)}
    />
];

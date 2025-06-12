import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { THEME_COLLECTIONS_DETAILS_URL, THEME_COLLECTIONS_LIST_URL } from "urls";
import { ThemeCollectionsListPage } from "pages/ThemeCollectionsListPage";
import { ThemeCollectionDetailsPage } from "pages/ThemeCollectionDetailsPage";

export const ThemeCollectionsRoutes = [
    <Route
        key="theme-collections-details-page"
        path={THEME_COLLECTIONS_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", ThemeCollectionDetailsPage)}
    />,
    <Route
        key="theme-collections-list-page"
        path={THEME_COLLECTIONS_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", ThemeCollectionsListPage)}
    />
];

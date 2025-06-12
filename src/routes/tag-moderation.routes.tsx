import React from "react";
import { Route } from "react-router";

import { TagDetailsPage, TagListPage } from "pages";
import { TAG_DETAILS_PAGE_URL, TAG_LIST_PAGE_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const TagRoutes = [
    <Route
        key="tag-list-page"
        path={TAG_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", TagListPage)}
    />,
    <Route
        key="tag-details-page"
        path={TAG_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("AssetFull", TagDetailsPage)}
    />
];

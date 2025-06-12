import React from "react";
import { Route } from "react-router";

import { TemplateSortingModePage, TemplateListPage, TemplateDetailsPage } from "pages";
import { TEMPLATE_DETAILS_URL, TEMPLATE_LIST_URL, TEMPLATE_SORTING_MODE_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const TemplateRoutes = [
    <Route
        key="template-sorting-mode"
        path={TEMPLATE_SORTING_MODE_URL.urlTemplate}
        component={renderProtectedPageElement("VideoModeration", TemplateSortingModePage)}
    />,
    <Route
        key="template-list-page"
        path={TEMPLATE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", TemplateListPage)}
    />,
    <Route
        key="template-details-page"
        path={TEMPLATE_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", TemplateDetailsPage)}
    />
];

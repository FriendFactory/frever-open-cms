import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { CMSAdminRolesPage, CMSAdminUsersPage } from "pages";
import { CMS_ADMIN_ROLES_PAGE_URL, CMS_ADMIN_USERS_PAGE_URL } from "urls";

export const SettingsRoutes = [
    <Route
        key="cms-admin-roles-page"
        path={CMS_ADMIN_ROLES_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Settings", CMSAdminRolesPage)}
    />,
    <Route
        key="cms-admin-users-page"
        path={CMS_ADMIN_USERS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("Settings", CMSAdminUsersPage)}
    />
];

import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { SpawnFormationListPage } from "pages";
import { SPAWN_FORMATION_LIST_PAGE_URL } from "urls";

export const SpawnFormationRoutes = [
    <Route
        key="spawn-formation-list-page"
        path={SPAWN_FORMATION_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("CategoriesFull", SpawnFormationListPage)}
    />
];

import React from "react";
import { Route } from "react-router";

import { CreatorCandidateListPage } from "pages";
import { CREATOR_CANDIDATE_LIST_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const CreatorCandidatesRoutes = [
    <Route
        key="star-creator-candidate-list-page"
        path={CREATOR_CANDIDATE_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CreatorCandidateListPage)}
    />
];

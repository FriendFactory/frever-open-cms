import React from "react";
import { Route } from "react-router";

import { CREATOR_CODES_LIST_PAGE, CREATOR_WELCOME_MESSAGES_PAGE } from "urls";
import { renderProtectedPageElement } from "shared";
import { CreatorCodesListPage } from "pages/CreatorCodesListPage";
import { CreatorWelcomeMessagesPage } from "pages/CreatorWelcomeMessagesPage";

export const CreatorCodesRoutes = [
    <Route
        key="creator-welcome-messages-list-page"
        path={CREATOR_WELCOME_MESSAGES_PAGE.urlTemplate}
        render={renderProtectedPageElement("Social", CreatorWelcomeMessagesPage)}
    />,
    <Route
        key="creator-codes-list-page"
        path={CREATOR_CODES_LIST_PAGE.urlTemplate}
        render={renderProtectedPageElement("Social", CreatorCodesListPage)}
    />
];

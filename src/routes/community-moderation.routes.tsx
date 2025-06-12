import React from "react";
import { Route } from "react-router";

import { renderProtectedPageElement } from "shared";
import { COMMUNITY_CHAT_URL, MASS_SEND_OUTS_DETAILS_PAGE_URL, MASS_SEND_OUTS_LIST_PAGE_URL } from "urls";
import { CommunityChatPage, MassSendOutsPage, ScheduledMessageDetailsPage } from "pages/community-pages";

export const CommunityModerationRoutes = [
    <Route
        key="community-chat-page"
        path={COMMUNITY_CHAT_URL.urlTemplate}
        render={renderProtectedPageElement("ChatMessageSending", CommunityChatPage)}
    />,
    <Route
        key="mass-send-outs"
        path={MASS_SEND_OUTS_LIST_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("ChatMessageSending", MassSendOutsPage)}
    />,
    <Route
        key="scheduled-message-details-page"
        path={MASS_SEND_OUTS_DETAILS_PAGE_URL.urlTemplate}
        render={renderProtectedPageElement("ChatMessageSending", ScheduledMessageDetailsPage)}
    />
];

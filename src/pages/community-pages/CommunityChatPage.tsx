import React from "react";
import { RouteComponentProps } from "react-router";

import { PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, ChatPageLayout, SideMenuLayout, RightPaneVisibilityProvider } from "layout";
import { ConversationWindowContainer, InboxMessagesListContainer } from "features/community-moderation";
import { COMMUNITY_CHAT_URL } from "urls";

export function CommunityChatPage(props: RouteComponentProps) {
    const urlMatch = COMMUNITY_CHAT_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Community Chat" />
                {!urlMatch.isMatched ? (
                    <PageURLNotMatch />
                ) : (
                    <StageSwitchTabsContainer url={COMMUNITY_CHAT_URL}>
                        <RightPaneVisibilityProvider>
                            <ChatPageLayout>
                                <div></div>
                                <ConversationWindowContainer url={COMMUNITY_CHAT_URL} params={urlMatch.query ?? {}} />
                                <InboxMessagesListContainer />
                            </ChatPageLayout>
                        </RightPaneVisibilityProvider>
                    </StageSwitchTabsContainer>
                )}
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

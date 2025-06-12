import React from "react";
import { RouteComponentProps } from "react-router";

import { StageSwitchTabsContainer, PageHeader, ListPagerContainer, PageURLNotMatch, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE, REPORTED_CHAT_MESSAGE_LIST_URL } from "urls";
import { ReportedChatMessageFilterFormContainer, ReportedChatMessagesContainer } from "features/reported-messages";
import { reportedMessageListSelector } from "features/reported-messages";
import { ChatMessageContent } from "features/chats-moderation";

export interface ReportedChatMessageListPageProps {}

export function ReportedChatMessageListPage(props: RouteComponentProps) {
    const urlMatch = REPORTED_CHAT_MESSAGE_LIST_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Reported Chat Messages" />
                    <StageSwitchTabsContainer url={REPORTED_CHAT_MESSAGE_LIST_URL}>
                        <ListLayoutFragment>
                            <ReportedChatMessageFilterFormContainer />
                            <PageErrorContainer
                                selector={reportedMessageListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <ReportedChatMessagesContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query}
                                    chatMessageContentComponent={ChatMessageContent}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_REPORTED_CHAT_MESSAGE_PAGE_SIZE}
                                url={REPORTED_CHAT_MESSAGE_LIST_URL}
                                selectorFactory={reportedMessageListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

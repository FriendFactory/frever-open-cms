import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, PageErrorContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { CHATS_MESSAGES_SEARCH_PAGE_URL, CHAT_MESSAGES_SEARCH_SIZE } from "urls";
import {
    ChatsMessageSearchFilterContainer,
    ChatsMessageSearchListContainer,
    messagesSearchListPageSelector
} from "features/chats-moderation";

export function ChatsMessagesSearchListPage(props: RouteComponentProps) {
    const urlMatch = CHATS_MESSAGES_SEARCH_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Search Messages" withBackButton />
                    <StageSwitchTabsContainer url={CHATS_MESSAGES_SEARCH_PAGE_URL}>
                        <ListLayoutFragment>
                            <ChatsMessageSearchFilterContainer url={CHATS_MESSAGES_SEARCH_PAGE_URL} />
                            <PageErrorContainer
                                selector={messagesSearchListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <ChatsMessageSearchListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                url={CHATS_MESSAGES_SEARCH_PAGE_URL}
                                defaultPageSize={CHAT_MESSAGES_SEARCH_SIZE}
                                selectorFactory={messagesSearchListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

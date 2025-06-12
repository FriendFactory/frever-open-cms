import React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";

import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { CHATS_MESSAGES_SEARCH_PAGE_URL, CHATS_LIST_PAGE_URL, CHAT_LIST_BASE_PAGE_SIZE } from "urls";
import { ChatsListFilterContainer, ChatsListContainer, chatsListPageSelector } from "features/chats-moderation";

export function ChatsListPage(props: RouteComponentProps) {
    const urlMatch = CHATS_LIST_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="All chats list"
                        extra={
                            <Button size="large" type="link">
                                <Link
                                    to={CHATS_MESSAGES_SEARCH_PAGE_URL.format({
                                        stage: urlMatch.params.stage
                                    })}>
                                    Search Messages <FileSearchOutlined />
                                </Link>
                            </Button>
                        }
                    />
                    <StageSwitchTabsContainer url={CHATS_LIST_PAGE_URL}>
                        <ListLayoutFragment>
                            <ChatsListFilterContainer />
                            <PageErrorContainer
                                selector={chatsListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <ChatsListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            </PageErrorContainer>
                            <ListPagerContainer
                                url={CHATS_LIST_PAGE_URL}
                                defaultPageSize={CHAT_LIST_BASE_PAGE_SIZE}
                                selectorFactory={chatsListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

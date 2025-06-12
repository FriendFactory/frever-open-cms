import React from "react";
import { RouteComponentProps } from "react-router";
import { Card } from "antd";

import { CHAT_HISTORY_PAGE_URL } from "urls";
import { PageHeader, PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment, ContentBlankLayout } from "layout";
import { ChatHistoryListContainer, SwitchPageContainer } from "features/chats-moderation";

export function ChatHistoryPage(props: RouteComponentProps) {
    const urlMatch = CHAT_HISTORY_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Chat History" withBackButton />
                <ContentBlankLayout>
                    <Card>
                        {!urlMatch.isMatched ? (
                            <PageURLNotMatch />
                        ) : (
                            <ListLayoutFragment>
                                <div></div>
                                <ChatHistoryListContainer
                                    stage={urlMatch.params.stage}
                                    chatId={urlMatch.params.chatId}
                                />
                                <SwitchPageContainer />
                            </ListLayoutFragment>
                        )}
                    </Card>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { useLocation } from "react-router";

import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { ListPagerContainer, PageHeader, StageSwitchTabsContainer } from "shared";
import { BOT_COMMENT_LIST_PAGE_URL, DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE } from "urls";
import { botCommentListPageSelector } from "features/bots-moderation/store/reducer/comment";
import { BotCommentsContainer, BotCommentsFilterFormContainer } from "features/bots-moderation";
import { AppState } from "app-state";

export function BotCommentListPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Automated Comments" />
                <StageSwitchTabsContainer url={BOT_COMMENT_LIST_PAGE_URL}>
                    <ListLayoutFragment>
                        <BotCommentsFilterFormContainer url={BOT_COMMENT_LIST_PAGE_URL} />
                        <BotCommentsContainer
                            selectorFactory={(appState: AppState) => {
                                const location = useLocation();
                                const urlMatch = BOT_COMMENT_LIST_PAGE_URL.match(location);

                                if (!urlMatch.isMatched)
                                    return { loading: false, error: "Something went wrong. The URL doesn't match." };

                                return botCommentListPageSelector(
                                    urlMatch.params.stage,
                                    urlMatch.query || {}
                                )(appState);
                            }}
                        />
                        <ListPagerContainer
                            url={BOT_COMMENT_LIST_PAGE_URL}
                            defaultPageSize={DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE}
                            selectorFactory={botCommentListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

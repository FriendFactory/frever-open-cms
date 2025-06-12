import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { DEFAULT_HASHTAG_LIST_SIZE, HASHTAG_LIST_PAGE_URL, HASHTAG_SORTING_PAGE_URL } from "urls";
import { PageHeader, ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { ListLayoutFragment, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { hashtagListPageSelector, HashtagListContainer, HashtagFilterFormContainer } from "features/hashtag-moderation";

export interface HashtagListPageProps {
    match: { params: { stage: string } };
}

export function HashtagListPage({ match: { params } }: HashtagListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader
                    title="Hashtags"
                    extra={
                        <Link
                            to={HASHTAG_SORTING_PAGE_URL.format(
                                { stage: params.stage },
                                { sortBy: "ChallengeSortOrder", sortDirection: "asc" }
                            )}>
                            <Button type="link">Sorting</Button>
                        </Link>
                    }
                />
                <StageSwitchTabsContainer url={HASHTAG_LIST_PAGE_URL}>
                    <ListLayoutFragment>
                        <HashtagFilterFormContainer />
                        <HashtagListContainer />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_HASHTAG_LIST_SIZE}
                            url={HASHTAG_LIST_PAGE_URL}
                            selectorFactory={hashtagListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { StageSwitchTabsContainer, PageHeader } from "shared";
import { HASHTAG_LIST_PAGE_URL, HASHTAG_SORTING_PAGE_URL } from "urls";
import { HashtagSortingContainer } from "features/hashtag-moderation";

export interface HashtagSortingPageProps {
    match: { params: { stage: string } };
}

export function HashtagSortingPage({ match: { params } }: HashtagSortingPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader
                    title="Hashtags"
                    extra={
                        <Link to={HASHTAG_LIST_PAGE_URL.format({ stage: params.stage })}>
                            <Button type="link">List</Button>
                        </Link>
                    }
                />
                <StageSwitchTabsContainer url={HASHTAG_SORTING_PAGE_URL} keepQuery>
                    <HashtagSortingContainer />
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

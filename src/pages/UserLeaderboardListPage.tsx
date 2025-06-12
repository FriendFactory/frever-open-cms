import React from "react";

import { PageHeader, ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ColumnsLayout } from "layout";
import { DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE, USER_LEADERBOARD_LIST_URL } from "urls";
import {
    LeaderboardGridContainer,
    LeaderboardFilterContainer,
    leaderboardListPageSelector
} from "features/user-leaderboard";

export interface UserLeaderboardListPageProps {}

export function UserLeaderboardListPage({}: UserLeaderboardListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="User Leaderboard" />
                <StageSwitchTabsContainer url={USER_LEADERBOARD_LIST_URL}>
                    <ColumnsLayout>
                        <LeaderboardFilterContainer />
                        <LeaderboardGridContainer />
                        <ListPagerContainer
                            url={USER_LEADERBOARD_LIST_URL}
                            defaultPageSize={DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE}
                            selectorFactory={leaderboardListPageSelector}
                        />
                    </ColumnsLayout>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

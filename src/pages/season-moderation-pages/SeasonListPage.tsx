import React from "react";

import { PageHeader, ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { DEFAULT_SEASON_LIST_PAGE_SIZE, SEASON_LIST_PAGE_URL } from "urls";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    SeasonListContainer,
    SeasonListFilterFormContainer,
    seasonListPageSelector
} from "features/seasons-moderation";

export interface SeasonListPageProps {}

export function SeasonListPage({}: SeasonListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="All Seasons" />
                <StageSwitchTabsContainer url={SEASON_LIST_PAGE_URL} cacheResetBtn>
                    <ListLayoutFragment>
                        <SeasonListFilterFormContainer />
                        <SeasonListContainer />
                        <ListPagerContainer
                            url={SEASON_LIST_PAGE_URL}
                            defaultPageSize={DEFAULT_SEASON_LIST_PAGE_SIZE}
                            selectorFactory={seasonListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

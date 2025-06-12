import React from "react";
import { RouteComponentProps } from "react-router";

import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { CREW_REWARDS_LIST_URL, DEFAULT_CREW_REWARDS_PAGE_SIZE } from "urls";
import { LootBoxSearchWindow, LootBoxCardContainer } from "features/lootbox-moderation";
import {
    CrewRewardsFilterFormContainer,
    CrewRewardsListContainer,
    crewRewardsListSelector
} from "features/crews-moderation";

export function CrewsRewardsPage(props: RouteComponentProps) {
    const urlMatch = CREW_REWARDS_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Crew Rewards" />
                    <StageSwitchTabsContainer url={CREW_REWARDS_LIST_URL}>
                        <ListLayoutFragment>
                            <CrewRewardsFilterFormContainer />
                            <PageErrorContainer
                                selector={crewRewardsListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <CrewRewardsListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query || {}}
                                    lootBoxSearchComponent={LootBoxSearchWindow}
                                    lootBoxCardComponent={LootBoxCardContainer}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_CREW_REWARDS_PAGE_SIZE}
                                url={CREW_REWARDS_LIST_URL}
                                selectorFactory={crewRewardsListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

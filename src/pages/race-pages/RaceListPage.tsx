import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_RACE_LIST_SIZE, RACE_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { RaceFilterContainer, RaceListContainer, raceListPageSelector } from "features/race-moderation";

export function RaceListPage(props: RouteComponentProps) {
    const urlMatch = RACE_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Race" />
                    <StageSwitchTabsContainer url={RACE_LIST_URL}>
                        <ListLayoutFragment>
                            <RaceFilterContainer url={RACE_LIST_URL} />
                            <RaceListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_RACE_LIST_SIZE}
                                url={RACE_LIST_URL}
                                selectorFactory={raceListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

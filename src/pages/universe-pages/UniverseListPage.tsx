import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_UNIVERSE_LIST_SIZE, UNIVERSE_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { UniverseFilterContainer, UniverseListContainer, universeListPageSelector } from "features/universe-moderation";

export function UniverseListPage(props: RouteComponentProps) {
    const urlMatch = UNIVERSE_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Universe" />
                    <StageSwitchTabsContainer url={UNIVERSE_LIST_URL}>
                        <ListLayoutFragment>
                            <UniverseFilterContainer url={UNIVERSE_LIST_URL} />
                            <UniverseListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_UNIVERSE_LIST_SIZE}
                                url={UNIVERSE_LIST_URL}
                                selectorFactory={universeListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

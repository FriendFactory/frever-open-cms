import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE, SPAWN_FORMATION_LIST_PAGE_URL } from "urls";
import { ListPagerContainer, PageErrorContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import {
    SpawnFormationListContainer,
    SpawnFormationListFilterContainer,
    spawnFormationListSelector
} from "features/spawn-formation";

export function SpawnFormationListPage(props: RouteComponentProps) {
    const urlMatch = SPAWN_FORMATION_LIST_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Character Spawn Position Formation" />
                <StageSwitchTabsContainer url={SPAWN_FORMATION_LIST_PAGE_URL}>
                    {!urlMatch.isMatched ? (
                        <PageURLNotMatch />
                    ) : (
                        <ListLayoutFragment>
                            <SpawnFormationListFilterContainer url={SPAWN_FORMATION_LIST_PAGE_URL} />
                            <PageErrorContainer
                                selector={spawnFormationListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <SpawnFormationListContainer
                                    stage={urlMatch.params.stage}
                                    params={urlMatch.query || {}}
                                />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE}
                                url={SPAWN_FORMATION_LIST_PAGE_URL}
                                selectorFactory={spawnFormationListSelector}
                            />
                        </ListLayoutFragment>
                    )}
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";

import { CREWS_LIST_BASE_PAGE_SIZE, CREWS_LIST_PAGE_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, ListPagerContainer, PageURLNotMatch, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { CrewsListContainer, crewListPageSelector, CrewFilterFormContainer } from "features/crews-moderation";

export function CrewsListPage(props: RouteComponentProps) {
    const urlMatch = CREWS_LIST_PAGE_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Crews" />
                <StageSwitchTabsContainer url={CREWS_LIST_PAGE_URL}>
                    <ListLayoutFragment>
                        <CrewFilterFormContainer />
                        {!urlMatch.isMatched ? (
                            <PageURLNotMatch />
                        ) : (
                            <PageErrorContainer
                                selector={crewListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <CrewsListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            </PageErrorContainer>
                        )}
                        <ListPagerContainer
                            defaultPageSize={CREWS_LIST_BASE_PAGE_SIZE}
                            url={CREWS_LIST_PAGE_URL}
                            selectorFactory={crewListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

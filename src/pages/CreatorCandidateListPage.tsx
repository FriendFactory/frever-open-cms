import React from "react";

import { CREATOR_CANDIDATE_LIST_URL, CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE } from "urls";
import { StageSwitchTabsContainer, PageHeader, ListPagerContainer } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import {
    CreatorCandidateFilterContainer,
    CreatorCandidateListContainer,
    creatorCandidateListPageSelector
} from "features/creator-candidates";

export function CreatorCandidateListPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Start Creator Candidates" />
                <StageSwitchTabsContainer url={CREATOR_CANDIDATE_LIST_URL}>
                    <ListLayoutFragment>
                        <CreatorCandidateFilterContainer />
                        <CreatorCandidateListContainer />
                        <ListPagerContainer
                            url={CREATOR_CANDIDATE_LIST_URL}
                            selectorFactory={creatorCandidateListPageSelector}
                            defaultPageSize={CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

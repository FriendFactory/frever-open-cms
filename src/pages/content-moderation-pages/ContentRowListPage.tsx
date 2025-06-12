import React from "react";
import { RouteComponentProps } from "react-router";

import { CREATE_PAGE_LIST_SIZE, CREATE_PAGE_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    createPageListPageSelector,
    CreatePageRowFilterContainer,
    CreatePageRowListContainer
} from "features/content-moderation";

export function ContentRowListPage(props: RouteComponentProps) {
    const urlMatch = CREATE_PAGE_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Create Page Rows" />
                    <StageSwitchTabsContainer url={CREATE_PAGE_LIST_URL} cacheResetBtn>
                        <ListLayoutFragment>
                            <CreatePageRowFilterContainer url={CREATE_PAGE_LIST_URL} />
                            <CreatePageRowListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={CREATE_PAGE_LIST_SIZE}
                                url={CREATE_PAGE_LIST_URL}
                                selectorFactory={createPageListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

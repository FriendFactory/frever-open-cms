import React from "react";
import { Link } from "react-router-dom";

import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { ListPagerContainer, StageSwitchTabsContainer, PageHeader } from "shared";
import { DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE, UMA_BUNDLE_LINKER_URL, UMA_BUNDLE_SEARCH_URL } from "urls";
import { UmaBundleGridContainer, SearchFilterFormContainer, umaBundleListPageSelector } from "features/search-assets";

export interface UmaBundleSearchPageProps {
    match: { params: { stage: string } };
}

export function UmaBundleSearchPage({ match: { params } }: UmaBundleSearchPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader
                    title="Uma Bundle List"
                    extra={<Link to={UMA_BUNDLE_LINKER_URL.format({ stage: params.stage })}>Linker</Link>}
                />
                <StageSwitchTabsContainer url={UMA_BUNDLE_SEARCH_URL} cacheResetBtn>
                    <ListLayoutFragment>
                        <SearchFilterFormContainer />
                        <UmaBundleGridContainer />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE}
                            url={UMA_BUNDLE_SEARCH_URL}
                            selectorFactory={umaBundleListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { Link } from "react-router-dom";

import { StageSwitchTabsContainer, PageHeader } from "shared";
import { UMA_BUNDLE_LINKER_URL, UMA_BUNDLE_SEARCH_URL } from "urls";
import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { UmaBundleLinkerContainer } from "features/search-assets/containers/UmaBundleLinker/UmaBundleLinkerContainer";
import { UmaBundleListsContainer } from "features/search-assets/containers/UmaBundleLinker/UmaBundleListsContainer";
import { PaginatorsContainer } from "features/search-assets/containers/UmaBundleLinker/PaginatorsContainer";
import { SearchFormsContainer } from "features/search-assets/containers/UmaBundleLinker/SearchFormsContainer";

export interface UmaBundleLinkerPageProps {
    match: { params: { stage: string } };
}

export function UmaBundleLinkerPage({ match: { params } }: UmaBundleLinkerPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader
                    title="Uma Bundle Linker"
                    extra={<Link to={UMA_BUNDLE_SEARCH_URL.format({ stage: params.stage })}>List</Link>}
                />
                <StageSwitchTabsContainer url={UMA_BUNDLE_LINKER_URL} cacheResetBtn>
                    <UmaBundleLinkerContainer />
                    <SearchFormsContainer />
                    <UmaBundleListsContainer />
                    <PaginatorsContainer />
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

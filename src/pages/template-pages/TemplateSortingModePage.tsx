import React from "react";
import { useLocation } from "react-router";

import { PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { TEMPLATE_SORTING_MODE_URL } from "urls";
import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { LoadMoreContainer, SortingModeListContainer } from "features/video-templates";
import { SortingModeDrowdown } from "features/video-templates/components/SortingModeDrowdown";

export function TemplateSortingModePage() {
    const location = useLocation();
    const urlMatch = TEMPLATE_SORTING_MODE_URL.match(location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader
                        title="Sorting order mode"
                        extra={<SortingModeDrowdown stage={urlMatch.params.stage} />}
                    />
                    <StageSwitchTabsContainer url={TEMPLATE_SORTING_MODE_URL}>
                        <SortingModeListContainer
                            stage={urlMatch.params.stage}
                            sortOrderType={urlMatch.params.sortOrderType}
                        />
                        <LoadMoreContainer
                            stage={urlMatch.params.stage}
                            sortOrderType={urlMatch.params.sortOrderType}
                            categoryId={urlMatch.query?.categoryId}
                        />
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

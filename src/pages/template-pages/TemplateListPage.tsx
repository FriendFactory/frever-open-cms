import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_TEMPLATE_LIST_PAGE_SIZE, TEMPLATE_LIST_URL } from "urls";
import { PageHeader, ListPagerContainer, StageSwitchTabsContainer, PageURLNotMatch } from "shared";
import { ListLayoutFragment, SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { TemplateListContainer, TemplFilterContainer, templateListPageSelector } from "features/video-templates";

export function TemplateListPage(props: RouteComponentProps) {
    const urlMatch = TEMPLATE_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="All Templates" />
                    <StageSwitchTabsContainer url={TEMPLATE_LIST_URL}>
                        <ListLayoutFragment>
                            <TemplFilterContainer url={TEMPLATE_LIST_URL} />
                            <TemplateListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_TEMPLATE_LIST_PAGE_SIZE}
                                url={TEMPLATE_LIST_URL}
                                selectorFactory={templateListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

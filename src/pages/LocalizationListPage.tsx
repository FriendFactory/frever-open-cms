import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_LOCALIZATION_PAGE_SIZE, LOCALIZATION_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    LocalizationListContainer,
    LocalizationListFilterContainer,
    localizationListSelector
} from "features/localization-moderation";

export function LocalizationListPage(props: RouteComponentProps) {
    const urlMatch = LOCALIZATION_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Localization" />
                    <StageSwitchTabsContainer url={LOCALIZATION_LIST_URL}>
                        <ListLayoutFragment>
                            <LocalizationListFilterContainer url={LOCALIZATION_LIST_URL} />
                            <LocalizationListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_LOCALIZATION_PAGE_SIZE}
                                url={LOCALIZATION_LIST_URL}
                                selectorFactory={localizationListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

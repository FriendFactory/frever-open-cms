import React from "react";
import { RouteComponentProps } from "react-router";

import { INTELLECTUAL_PROPERTY_LIST_SIZE, INTELLECTUAL_PROPERTY_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    IntellectualPropertyFilterContainer,
    IntellectualPropertyListContainer,
    intellectualPropertyListPageSelector
} from "features/intellectual-property";

export function IntellectualPropertyListPage(props: RouteComponentProps) {
    const urlMatch = INTELLECTUAL_PROPERTY_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Intellectual Property" />
                    <StageSwitchTabsContainer url={INTELLECTUAL_PROPERTY_LIST_URL}>
                        <ListLayoutFragment>
                            <IntellectualPropertyFilterContainer url={INTELLECTUAL_PROPERTY_LIST_URL} />
                            <IntellectualPropertyListContainer
                                stage={urlMatch.params.stage}
                                params={urlMatch.query || {}}
                            />
                            <ListPagerContainer
                                defaultPageSize={INTELLECTUAL_PROPERTY_LIST_SIZE}
                                url={INTELLECTUAL_PROPERTY_LIST_URL}
                                selectorFactory={intellectualPropertyListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

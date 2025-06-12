import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_EMOTIONS_LIST_SIZE, EMOTIONS_LIST_URL } from "urls";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, PageErrorContainer, ListPagerContainer } from "shared";
import {
    EmotionFilterFormContainer,
    EmotionListContainer,
    emotionsListPageSelector
} from "features/emotion-moderation";

export function EmotionsListPage(props: RouteComponentProps) {
    const urlMatch = EMOTIONS_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Emotions" />
                <StageSwitchTabsContainer url={EMOTIONS_LIST_URL}>
                    <ListLayoutFragment>
                        <EmotionFilterFormContainer />
                        {!urlMatch.isMatched ? (
                            <PageURLNotMatch />
                        ) : (
                            <PageErrorContainer
                                selector={emotionsListPageSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <EmotionListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            </PageErrorContainer>
                        )}
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_EMOTIONS_LIST_SIZE}
                            url={EMOTIONS_LIST_URL}
                            selectorFactory={emotionsListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

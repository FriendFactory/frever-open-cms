import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_WATERMARK_LIST_SIZE, WATERMARK_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    WatermarkListContainer,
    WatermarkListFilterContainer,
    watermarkListPageSelector
} from "features/watermark-moderation";

export function WatermarkListPage(props: RouteComponentProps) {
    const urlMatch = WATERMARK_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Watermark" />
                    <StageSwitchTabsContainer url={WATERMARK_LIST_URL}>
                        <ListLayoutFragment>
                            <WatermarkListFilterContainer url={WATERMARK_LIST_URL} />
                            <WatermarkListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_WATERMARK_LIST_SIZE}
                                url={WATERMARK_LIST_URL}
                                selectorFactory={watermarkListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

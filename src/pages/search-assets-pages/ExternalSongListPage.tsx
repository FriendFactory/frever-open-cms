import React from "react";

import { DEFAULT_ASSETS_PAGE_SIZE, EXTERNAL_SONG_LIST_URL } from "urls";
import { PageHeader, ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    externalSongListPageSelector,
    ExternalSongListContainer,
    ExternalSongFilterContainer
} from "features/search-assets";

export interface ExternalSongListPageProps {}

export function ExternalSongListPage({}: ExternalSongListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="External Song" />
                <StageSwitchTabsContainer url={EXTERNAL_SONG_LIST_URL}>
                    <ListLayoutFragment>
                        <ExternalSongFilterContainer />
                        <ExternalSongListContainer />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_ASSETS_PAGE_SIZE}
                            url={EXTERNAL_SONG_LIST_URL}
                            selectorFactory={externalSongListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";

import { DEFAULT_PLAYLISTS_PAGE_SIZE, PLAYLISTS_PAGE_URL } from "urls";
import { ListPagerContainer, StageSwitchTabsContainer, PageHeader } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { PlaylistsGridContainer, playlistsPageSelector } from "features/external-music";

export function PlaylistsPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Playlists" />
                <StageSwitchTabsContainer url={PLAYLISTS_PAGE_URL}>
                    <ListLayoutFragment>
                        <div></div>
                        <PlaylistsGridContainer />
                        <ListPagerContainer
                            url={PLAYLISTS_PAGE_URL}
                            defaultPageSize={DEFAULT_PLAYLISTS_PAGE_SIZE}
                            selectorFactory={playlistsPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

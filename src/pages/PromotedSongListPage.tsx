import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_PROMOTED_SONG_LIST_SIZE, PROMOTED_SONG_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, ListPagerContainer, PageURLNotMatch } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { PromotedSongListContainer } from "features/promoted-songs/containers/PromotedSongListContainer";
import { PromotedSongFilterFormContainer, promotedSongListPagerSelector } from "features/promoted-songs";

export function PromotedSongListPage(props: RouteComponentProps) {
    const urlMatch = PROMOTED_SONG_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Promoted Songs" />
                <StageSwitchTabsContainer url={PROMOTED_SONG_LIST_URL}>
                    {!urlMatch.isMatched ? (
                        <PageURLNotMatch />
                    ) : (
                        <ListLayoutFragment>
                            <PromotedSongFilterFormContainer />
                            <PromotedSongListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                url={PROMOTED_SONG_LIST_URL}
                                selectorFactory={promotedSongListPagerSelector}
                                defaultPageSize={DEFAULT_PROMOTED_SONG_LIST_SIZE}
                            />
                        </ListLayoutFragment>
                    )}
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE, VIDEO_LEADERBOARD_LIST_URL } from "urls";
import {
    videoLeaderboardListPageSelector,
    VideoLeaderboardFilterContainer,
    VideoLeaderboardListContainer
} from "features/video-leaderboard";

export function VideoLeaderboardListPage(props: RouteComponentProps) {
    const urlMatch = VIDEO_LEADERBOARD_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Video Leaderboard" />
                    <StageSwitchTabsContainer url={VIDEO_LEADERBOARD_LIST_URL}>
                        <ListLayoutFragment>
                            <VideoLeaderboardFilterContainer url={VIDEO_LEADERBOARD_LIST_URL} />
                            <VideoLeaderboardListContainer
                                stage={urlMatch.params.stage}
                                params={urlMatch.query || {}}
                            />
                            <ListPagerContainer
                                url={VIDEO_LEADERBOARD_LIST_URL}
                                defaultPageSize={DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE}
                                selectorFactory={videoLeaderboardListPageSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

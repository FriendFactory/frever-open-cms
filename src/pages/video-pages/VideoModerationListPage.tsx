import React from "react";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader } from "shared";
import { DEFAULT_VIDEO_PAGE_SIZE, VIDEO_MODERATION_LIST_URL } from "urls";
import { ColumnsLayout, ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import {
    VideoFilterFormContainer,
    VideoListContainer,
    videoModerationListPageSelector,
    VideoCommandByHashtagContainer
} from "features/video-moderation";

export interface VideoModerationListPageProps {}

export function VideoModerationListPage({}: VideoModerationListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="All Videos" />
                <StageSwitchTabsContainer url={VIDEO_MODERATION_LIST_URL}>
                    <ListLayoutFragment>
                        <ColumnsLayout>
                            <VideoFilterFormContainer />
                            <VideoCommandByHashtagContainer />
                        </ColumnsLayout>
                        <VideoListContainer />
                        <ListPagerContainer
                            url={VIDEO_MODERATION_LIST_URL}
                            defaultPageSize={DEFAULT_VIDEO_PAGE_SIZE}
                            selectorFactory={videoModerationListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

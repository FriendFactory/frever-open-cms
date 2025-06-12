import React from "react";

import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { SideMenuLayout, ContentWithHeaderFragment, ContentBlankLayout } from "layout";
import {
    VideoDetailsContainer,
    VideoDetailsHeaderContainer,
    VideoDetailsTabsContainer
} from "features/video-moderation";

export interface VideoDetailsPageProps {}

export function VideoDetailsPage({}: VideoDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <VideoDetailsHeaderContainer url={VIDEO_MODERATION_DETAILS_URL} />
                <VideoDetailsTabsContainer url={VIDEO_MODERATION_DETAILS_URL} activeTab={"video"}>
                    <ContentBlankLayout>
                        <VideoDetailsContainer />
                    </ContentBlankLayout>
                </VideoDetailsTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

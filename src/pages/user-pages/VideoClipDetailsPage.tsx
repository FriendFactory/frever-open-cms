import React from "react";

import { VIDEOCLIP_DETAILS_URL } from "urls";
import { ContentWithHeaderFragment, SideMenuLayout, DetailsPageLayout } from "layout";
import { VideoMediaFileContainer, VideoClipHeaderContainer, VideoClipFormContainer } from "features/user-media";

export interface VideoClipDetailsPageProps {}

export function VideoClipDetailsPage({}: VideoClipDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <VideoClipHeaderContainer url={VIDEOCLIP_DETAILS_URL} />
                <DetailsPageLayout reversed sideBlockWidth={360}>
                    <VideoClipFormContainer />
                    <VideoMediaFileContainer />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";

import { ContentWithHeaderFragment } from "layout/ContentWithHeaderFragment";
import { SideMenuLayout } from "layout/SideMenuLayout";
import { DetailsPageLayout } from "layout/DetailsPageLayout";
import {
    EventContainedAssetContainer,
    EventHeaderContainer,
    EventMainInfoContainer,
    EventThumbnailContainer
} from "features/level-moderation";

export interface EventDetailsPageProps {}

export function EventDetailsPage({}: EventDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <EventHeaderContainer />
                <DetailsPageLayout>
                    <EventMainInfoContainer />
                    <EventThumbnailContainer />
                    <EventContainedAssetContainer />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

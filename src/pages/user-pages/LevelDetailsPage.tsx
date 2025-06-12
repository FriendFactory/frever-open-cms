import React from "react";

import { ContentWithHeaderFragment } from "layout/ContentWithHeaderFragment";
import { SideMenuLayout } from "layout/SideMenuLayout";
import { LEVEL_DETAILS_URL } from "urls";
import { DetailsPageLayout } from "layout/DetailsPageLayout";
import {
    LevelContainedClipsContainer,
    LevelHeaderContainer,
    LevelMainInfoContainer,
    LevelThumbnailContainer
} from "features/level-moderation";

export interface LevelDetailsPageProps {}

export function LevelDetailsPage({}: LevelDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <LevelHeaderContainer url={LEVEL_DETAILS_URL} />
                <DetailsPageLayout>
                    <LevelMainInfoContainer url={LEVEL_DETAILS_URL} />
                    <LevelThumbnailContainer url={LEVEL_DETAILS_URL} />
                    <LevelContainedClipsContainer url={LEVEL_DETAILS_URL} />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

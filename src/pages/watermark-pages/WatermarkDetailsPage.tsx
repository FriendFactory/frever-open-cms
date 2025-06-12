import React from "react";
import { RouteComponentProps } from "react-router";

import { WATERMARK_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import {
    WatermarkDetailsHeader,
    WatermarkDetailsThumbnailsContainer,
    WatermarkInfoFormContainer
} from "features/watermark-moderation";

export function WatermarkDetailsPage(props: RouteComponentProps) {
    const urlMatch = WATERMARK_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <WatermarkDetailsHeader {...urlMatch.params} />
                    <DetailsPageLayout>
                        <WatermarkInfoFormContainer {...urlMatch.params} />
                        <WatermarkDetailsThumbnailsContainer {...urlMatch.params} />
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

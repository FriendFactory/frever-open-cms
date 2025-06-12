import React from "react";
import { RouteComponentProps } from "react-router";

import { PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import { BACKGROUND_AI_DETAILS_URL } from "urls";
import {
    BackgroundAIDetailsHeader,
    BackgroundAIInfoFormContainer,
    BackgroundAIThumbnailsContainer
} from "features/vme-backgrounds";

export function BackgroundAIDetailsPage(props: RouteComponentProps) {
    const urlMatch = BACKGROUND_AI_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <BackgroundAIDetailsHeader {...urlMatch.params} />

                    <DetailsPageLayout>
                        <BackgroundAIInfoFormContainer {...urlMatch.params} />
                        <BackgroundAIThumbnailsContainer {...urlMatch.params} />
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";

import { UNIVERSE_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import {
    UniverseDetailsHeader,
    UniverseInfoFormContainer,
    UniverseThumbnailsContainer
} from "features/universe-moderation";

export function UniverseDetailsPage(props: RouteComponentProps) {
    const urlMatch = UNIVERSE_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <UniverseDetailsHeader {...urlMatch.params} />
                    <DetailsPageLayout>
                        <UniverseInfoFormContainer {...urlMatch.params} />
                        <UniverseThumbnailsContainer {...urlMatch.params} />
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

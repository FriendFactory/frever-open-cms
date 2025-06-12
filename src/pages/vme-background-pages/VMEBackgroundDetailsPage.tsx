import React from "react";
import { RouteComponentProps } from "react-router";

import { PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import { VME_BACKGROUND_DETAILS_URL } from "urls";
import {
    VMEBackgroundDetailsHeader,
    VMEBackgroundInfoFormContainer,
    VMEBackgroundThumbnailsContainer
} from "features/vme-backgrounds";

export function VMEBackgroundDetailsPage(props: RouteComponentProps) {
    const urlMatch = VME_BACKGROUND_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <VMEBackgroundDetailsHeader {...urlMatch.params} />

                    <DetailsPageLayout>
                        <VMEBackgroundInfoFormContainer {...urlMatch.params} />
                        <VMEBackgroundThumbnailsContainer {...urlMatch.params} />
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

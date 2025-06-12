import React from "react";
import { RouteComponentProps } from "react-router";

import { THEME_COLLECTIONS_DETAILS_URL } from "urls";
import { PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, DetailsPageLayout, SideMenuLayout } from "layout";
import {
    ThemeCollectionThumbnailsContainer,
    ThemeCollectionsDetailsHeader,
    ThemeCollectionsDetailsWardrobes,
    ThemeCollectionInfoFormContainer
} from "features/theme-collections";

export function ThemeCollectionDetailsPage(props: RouteComponentProps) {
    const urlMatch = THEME_COLLECTIONS_DETAILS_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <ThemeCollectionsDetailsHeader {...urlMatch.params} />
                    <DetailsPageLayout>
                        <ThemeCollectionInfoFormContainer {...urlMatch.params} />
                        <ThemeCollectionThumbnailsContainer {...urlMatch.params} />
                        <ThemeCollectionsDetailsWardrobes {...urlMatch.params} />
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

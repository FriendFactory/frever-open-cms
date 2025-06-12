import React from "react";

import { PHOTO_DETAILS_URL } from "urls";
import { SideMenuLayout, DetailsPageLayout, ContentWithHeaderFragment } from "layout";
import { PhotoMediaFileContainer, PhotoHeaderContainer, PhotoFormContainer } from "features/user-media";

export interface PhotoDetailsPageProps {}

export function PhotoDetailsPage({}: PhotoDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PhotoHeaderContainer url={PHOTO_DETAILS_URL} />
                <DetailsPageLayout sideBlockWidth={360}>
                    <PhotoFormContainer />
                    <PhotoMediaFileContainer />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";

import { ColumnsLayout, SideMenuLayout, ContentWithHeaderFragment, DetailsPageLayout } from "layout";
import { OUTFIT_DETAILS_URL } from "urls";
import {
    OutfitAssetGridContainer,
    OutfitHeaderContainer,
    OutfitMainInfoContainer,
    OutfitTagsContainer,
    OutfitThumbnailContainer
} from "features/outfit-moderation";

export interface OutfitDetailsPageProps {}

export function OutfitDetailsPage({}: OutfitDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <OutfitHeaderContainer url={OUTFIT_DETAILS_URL} />
                <DetailsPageLayout>
                    <ColumnsLayout>
                        <OutfitMainInfoContainer />
                        <OutfitTagsContainer />
                    </ColumnsLayout>
                    <OutfitThumbnailContainer />
                    <OutfitAssetGridContainer />
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

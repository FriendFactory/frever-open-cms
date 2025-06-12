import React from "react";

import { SideMenuLayout, ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment } from "layout";
import {
    UmaBundleInfoContainer,
    UmaBundleHeaderContainer,
    AssetFilesContainer,
    UmaWardrobeListContainer
} from "features/search-assets";

export interface UmaBundleDetailsPageProps {}

export function UmaBundleDetailsPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <UmaBundleHeaderContainer />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <UmaBundleInfoContainer />
                        <AssetFilesContainer />
                        <UmaWardrobeListContainer />
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

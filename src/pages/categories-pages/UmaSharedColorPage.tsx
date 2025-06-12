import React from "react";

import { ContentWithHeaderFragment, SideMenuLayout, ContentBlankLayout } from "layout";
import { USCHeaderContainer, USColorListContainer } from "features/categories-moderation";

export interface UmaSharedColorPageProps {}

function UmaSharedColorPage({}: UmaSharedColorPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <USCHeaderContainer />
                <ContentBlankLayout>
                    <USColorListContainer />
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

export default UmaSharedColorPage;

import React from "react";

import { ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { HeaderContainer, DetailsFormContainer, ExternalSongInfoContainer } from "features/search-assets";

export interface ExternalSongDetailsProps {}

export function ExternalSongDetailsPage({}: ExternalSongDetailsProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <HeaderContainer />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <ExternalSongInfoContainer />
                        <DetailsFormContainer />
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

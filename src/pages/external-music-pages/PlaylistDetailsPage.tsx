import React from "react";

import { ColumnsLayout, SideMenuLayout, ContentWithHeaderFragment, ContentBlankLayout } from "layout";
import { PlaylistHeaderContainer, PlaylistFormContainer, PlaylistTracksContainer } from "features/external-music";

export function PlaylistDetailsPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PlaylistHeaderContainer />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <PlaylistFormContainer />
                        <PlaylistTracksContainer />
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";

import { ContentWithHeaderFragment, DetailsPageLayout, ColumnsLayout, SideMenuLayout } from "layout";
import { CHARACTER_DETAILS_INFO_URL } from "urls";
import {
    CharacterHeaderContainer,
    CharacterMainInfoContainer,
    CharacterAssetGridContainer,
    CharacterThumbnailListContainer,
    CharacterFormContainer,
    CharacterBakedViewContainer
} from "features/search-characters";
import { renderProtectedComponent } from "shared";

export interface CharacterDetailsPageProps {}

export function CharacterDetailsPage({}: CharacterDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <CharacterHeaderContainer url={CHARACTER_DETAILS_INFO_URL} />
                <DetailsPageLayout>
                    <ColumnsLayout>
                        <CharacterMainInfoContainer url={CHARACTER_DETAILS_INFO_URL} />
                        <CharacterFormContainer />
                        <CharacterBakedViewContainer url={CHARACTER_DETAILS_INFO_URL} />
                    </ColumnsLayout>
                    <CharacterThumbnailListContainer />
                    {renderProtectedComponent(
                        "AssetRead",
                        <CharacterAssetGridContainer url={CHARACTER_DETAILS_INFO_URL} />
                    )}
                </DetailsPageLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

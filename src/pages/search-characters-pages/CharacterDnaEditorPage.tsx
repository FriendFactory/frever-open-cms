import React from "react";

import { CHARACTER_DETAILS_DNA_EDITOR_URL } from "urls";
import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { UmaRecipeEditorContainer, CharacterHeaderContainer } from "features/search-characters";

export interface CharacterDnaEditorPageProps {}

export function CharacterDnaEditorPage({}: CharacterDnaEditorPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <CharacterHeaderContainer url={CHARACTER_DETAILS_DNA_EDITOR_URL} />
                <UmaRecipeEditorContainer />
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

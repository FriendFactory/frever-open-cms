import React from "react";
import { Route } from "react-router";

import { CharacterListPage, CharacterDnaEditorPage, CharacterDetailsPage, CharacterBakingProcessPage } from "pages";
import {
    CHARACTER_DETAILS_DNA_EDITOR_URL,
    CHARACTER_DETAILS_INFO_URL,
    CHARACTER_LIST_URL,
    CHARACTERS_BAKING_URL
} from "urls";
import { renderProtectedPageElement } from "shared";

export const CharacterRoutes = [
    <Route
        key="character-list-page"
        path={CHARACTER_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CharacterListPage)}
    />,
    <Route
        key="character-details-page"
        path={CHARACTER_DETAILS_INFO_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CharacterDetailsPage)}
    />,
    <Route
        key="character-details-dna-editor-page"
        path={CHARACTER_DETAILS_DNA_EDITOR_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CharacterDnaEditorPage)}
    />,
    <Route
        key="character-baking-process-page"
        path={CHARACTERS_BAKING_URL.urlTemplate}
        render={renderProtectedPageElement("Social", CharacterBakingProcessPage)}
    />
];

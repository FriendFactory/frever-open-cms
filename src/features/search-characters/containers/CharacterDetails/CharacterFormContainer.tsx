import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { CharacterForm } from "features/search-characters/components/CharacterDetails/CharacterForm";
import { EditCharacterFormData } from "features/search-characters/services";
import { updateCharacterAction } from "features/search-characters/store";
import { CHARACTER_DETAILS_INFO_URL } from "urls";
import { characterDetailsSelector } from "features/search-characters/store";

export interface CharacterFormContainerProps {}

export function CharacterFormContainer({}: CharacterFormContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = CHARACTER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(characterDetailsSelector(stage, id));

    const handleOnSubmit = (data: EditCharacterFormData) =>
        dispatch(updateCharacterAction({ stage, data: { id, ...data } }));

    if (!info.data && !info.loading) {
        return null;
    }
    return (
        <CharacterForm stage={stage} loading={!info.data && info.loading} data={info.data} onSubmit={handleOnSubmit} />
    );
}

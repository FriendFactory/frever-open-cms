import React from "react";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";

import { characterDetailsSelector } from "../../store";
import { CharacterBakedView } from "features/search-characters/components/CharacterDetails/CharacterBakedView";
import { bakedViewByCharacterIdSelector } from "features/search-characters/store/reducer/characterBakedView/listReducer";

export interface CharacterBakedViewContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function CharacterBakedViewContainer({ url }: CharacterBakedViewContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;

    const info = useSelector(characterDetailsSelector(stage, id));
    const bakedViewInfo = useSelector(bakedViewByCharacterIdSelector(stage, id));

    return (
        <CharacterBakedView
            stage={stage}
            loading={bakedViewInfo.loading}
            character={info.data}
            bakedView={bakedViewInfo.data}
        />
    );
}

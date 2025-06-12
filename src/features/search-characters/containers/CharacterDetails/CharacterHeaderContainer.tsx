import React from "react";
import { Result } from "antd";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { characterDetailsSelector } from "../../store";
import { CharacterHeader } from "features/search-characters/components/CharacterDetails/CharacterHeader";

export interface CharacterHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function CharacterHeaderContainer({ url }: CharacterHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(characterDetailsSelector(stage, id));
    return (
        <>
            <CharacterHeader id={id} character={info.data} />
            {!info.data && !info.loading && (
                <Result status="404" title={info.error ?? "Character is not found or not accessible"} />
            )}
        </>
    );
}

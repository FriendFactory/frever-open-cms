import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";

import { CharacterMainInfo } from "../../components/CharacterDetails";
import { characterDetailsSelector, characterWardrobesSelector } from "../../store";

export interface CharacterMainInfoContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function CharacterMainInfoContainer({ url }: CharacterMainInfoContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const info = useSelector(characterDetailsSelector(stage, id));

    const umaRecipe = useMemo(() => info.data?.characterAndUmaRecipe[0]?.umaRecipe, [info.data]);

    const params = { skip: 0, take: 500, umaRecipeId: umaRecipe?.id };

    const wardrobesInfo = useSelector(characterWardrobesSelector(stage, params));

    const isBakeable = useMemo(() => {
        return !wardrobesInfo?.data?.length || wardrobesInfo.data.every(({ availableForBaking }) => availableForBaking);
    }, [wardrobesInfo]);

    if (!info.data && !info.loading) {
        return null;
    }
    return (
        <CharacterMainInfo
            stage={stage}
            loading={info.loading && !info.data}
            character={info.data}
            isBakeable={isBakeable}
        />
    );
}

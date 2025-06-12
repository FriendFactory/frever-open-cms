import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { CharacterList } from "../components/CharacterList";
import { CHARACTER_LIST_URL, CHARACTER_DETAILS_INFO_URL } from "urls";
import { characterListPageSelector } from "../store";
import { Character } from "features/user-moderation/services";
import { GetCharacterListParams } from "../services";

export interface CharacterListContainerProps {}

export function CharacterListContainer({}: CharacterListContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = CHARACTER_LIST_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage } = urlMatch.params;

    const info = useSelector(characterListPageSelector(stage, urlMatch.query || {}));

    const onRow = useCallback(
        (chara: Character) => ({
            onClick: () => history.push(CHARACTER_DETAILS_INFO_URL.format({ stage: stage, id: chara.id }))
        }),
        [stage]
    );

    const onSort = useCallback(
        (orderBy: GetCharacterListParams["orderBy"], sortDirection: GetCharacterListParams["sortDirection"]) => {
            const newUrl = CHARACTER_LIST_URL.replace(
                location,
                {},
                {
                    orderBy,
                    sortDirection
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location, history]
    );

    return (
        <CharacterList
            stage={stage}
            data={info.data ?? []}
            loading={!info.data && info.loading}
            orderBy={urlMatch.query?.orderBy}
            sortDirection={urlMatch.query?.sortDirection}
            onSort={onSort}
            onRow={onRow}
        />
    );
}

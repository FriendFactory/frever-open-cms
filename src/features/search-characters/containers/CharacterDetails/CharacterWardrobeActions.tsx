import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { CHARACTER_DETAILS_INFO_URL } from "urls";
import { characterDetailsSelector, updateUmaRecipeAction } from "features/search-characters/store";

export interface CharacterWardrobeActionsProps {
    wardrobeId: number;
}

export function CharacterWardrobeActions({ wardrobeId }: CharacterWardrobeActionsProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = CHARACTER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const characterInfo = useSelector(characterDetailsSelector(stage, id));

    const umaRecipe = useMemo(() => characterInfo.data?.characterAndUmaRecipe[0].umaRecipe, [characterInfo.data]);

    const isLinked = useMemo(
        () => umaRecipe?.umaRecipeAndWardrobe.some((el) => el.wardrobeId === wardrobeId),
        [umaRecipe, stage, wardrobeId, characterInfo]
    );

    const changeStatusOfLinking = useCallback(() => {
        if (umaRecipe?.id) {
            dispatch(
                updateUmaRecipeAction({
                    stage,
                    data: {
                        id: umaRecipe.id,
                        umaRecipeAndWardrobe: [{ wardrobeId: isLinked ? -wardrobeId : wardrobeId }]
                    }
                })
            );
        }
    }, [umaRecipe?.id, isLinked]);

    return (
        <Button
            type="primary"
            ghost
            danger={isLinked}
            onClick={changeStatusOfLinking}
            icon={isLinked ? <MinusOutlined /> : <PlusOutlined />}
        />
    );
}

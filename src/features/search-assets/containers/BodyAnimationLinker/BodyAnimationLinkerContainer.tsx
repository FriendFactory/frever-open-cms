import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { BODY_ANIMATION_LINKER_URL } from "urls";
import { assetListPageSelector, bodyAnimationLinkerAction } from "features/search-assets/store";
import { BodyAnimationLinker } from "features/search-assets/components/BodyAnimationLinker/BodyAnimationLinker";
import { message } from "antd";

export function BodyAnimationLinkerContainer() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const urlMatch = BODY_ANIMATION_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const stage = urlMatch.params.stage;

    const bodyAnimation = useSelector(
        assetListPageSelector(
            stage,
            { search: urlMatch.query?.bodyAnimSearch, skip: urlMatch.query?.bodyAnimSkip },
            "BodyAnimation"
        )
    );

    const charaSpawnPos = useSelector(
        assetListPageSelector(
            stage,
            { skip: urlMatch.query?.charSpawnPosSkip, search: urlMatch.query?.charSpawnPosSearch },
            "CharacterSpawnPosition"
        )
    );

    const selectedCharaSpawnPositionsIds = useMemo(
        () => urlMatch.query?.selectedCharaSpawnPos?.split(","),
        [urlMatch.query?.selectedCharaSpawnPos]
    );

    const selectedBodyAnim = bodyAnimation.data?.find((el) => el.id.toString() === urlMatch.query?.selectedBodyAnim);

    const selectedCharaSpawnPositions = charaSpawnPos.data?.filter((el) =>
        selectedCharaSpawnPositionsIds?.includes(el.id.toString())
    );

    const unbindedSpawnPositions = selectedCharaSpawnPositions?.filter(
        (charaSpawnPos) =>
            !charaSpawnPos.bodyAnimationAndCharacterSpawnPosition.find(
                (record) => record.bodyAnimationId === selectedBodyAnim?.id
            )
    );

    const bindedSpawnPositions = selectedCharaSpawnPositions?.filter((charaSpawnPos) =>
        charaSpawnPos.bodyAnimationAndCharacterSpawnPosition.find(
            (record) => record.bodyAnimationId === selectedBodyAnim?.id
        )
    );

    const bindAssets = (action: "bind" | "unbind") => () => {
        if (!selectedBodyAnim?.id) {
            message.warning("Body animation is not selected");
            return;
        }

        const data =
            (action === "bind"
                ? unbindedSpawnPositions?.map((el) => ({
                      characterSpawnPositionId: el.id
                  }))
                : bindedSpawnPositions?.map((el) => ({
                      characterSpawnPositionId: -Math.abs(el.id)
                  }))) || [];

        dispatch(
            bodyAnimationLinkerAction({
                stage: stage,
                bodyAnimId: selectedBodyAnim.id,
                data,
                updateAfter: { type: "lists", params: urlMatch.query ?? {} }
            })
        );
    };

    const clearLinker = useCallback(() => {
        const newUrl = BODY_ANIMATION_LINKER_URL.replace(
            location,
            {},
            { selectedBodyAnim: undefined, selectedCharaSpawnPos: undefined }
        );

        newUrl && history.replace(newUrl);
    }, []);

    return (
        <BodyAnimationLinker
            stage={stage}
            bodyAnimation={selectedBodyAnim}
            characterSpawnPositions={selectedCharaSpawnPositions}
            isUnbindAvailable={!!selectedBodyAnim && !!bindedSpawnPositions?.length}
            isBindAvailable={!!selectedBodyAnim && !!unbindedSpawnPositions?.length}
            isClearBtnAvailable={!!selectedCharaSpawnPositionsIds || !!selectedBodyAnim}
            bindAssets={bindAssets}
            clearLinker={clearLinker}
        />
    );
}

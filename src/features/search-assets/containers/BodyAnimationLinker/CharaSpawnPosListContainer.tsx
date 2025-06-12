import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { assetListHandleLoadAction, assetListPageSelector } from "features/search-assets/store";
import { BODY_ANIMATION_LINKER_URL } from "urls";
import { CharacterSpawnPosition } from "features/search-assets/services";
import { CharaSpawnPosList } from "features/search-assets/components/BodyAnimationLinker/CharaSpawnPosList";

export function CharaSpawnPosListContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const urlMatch = BODY_ANIMATION_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const stage = urlMatch.params.stage;
    const { charSpawnPosSearch: search, charSpawnPosSkip: skip } = urlMatch.query ?? {};

    useEffect(() => {
        dispatch(
            assetListHandleLoadAction({
                stage,
                asset: "CharacterSpawnPosition",
                params: { skip, search },
                expand: ["setLocationBundle", "bodyAnimationAndCharacterSpawnPosition"]
            })
        );
    }, [skip, search, stage]);

    const info = useSelector(assetListPageSelector(stage, { skip, search }, "CharacterSpawnPosition"));

    const selectedAssets = useMemo(
        () => urlMatch.query?.selectedCharaSpawnPos?.split(","),
        [urlMatch.query?.selectedCharaSpawnPos]
    );

    const rowSelection = {
        type: "checkbox" as "checkbox",
        onSelect: (_record: CharacterSpawnPosition, _selected: boolean, selectedRows: CharacterSpawnPosition[]) => {
            const newUrl = BODY_ANIMATION_LINKER_URL.replace(
                location,
                {},
                { selectedCharaSpawnPos: selectedRows.map((el) => el.id).join(",") }
            );
            newUrl && history.replace(newUrl);
        },
        selectedRowKeys: selectedAssets ?? [],
        hideSelectAll: true
    };

    return (
        <CharaSpawnPosList
            stage={stage}
            loading={!info.data && info.loading}
            data={info.data ?? []}
            rowSelection={rowSelection}
        />
    );
}

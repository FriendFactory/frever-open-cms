import React, { useCallback } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { DETAILS_ASSET_URL } from "urls";
import { assetEditAction, assetDetailsSelector, AssetInfoToUpdate } from "features/search-assets/store";
import { AssetDataNames } from "features/search-assets/services";
import { SetLocationBundle, CharacterSpawnPosition } from "features/search-assets/components/AssetDetails";

export interface SetLocSubAssetContainerProps {}

export function SetLocSubAssetContainer({}: SetLocSubAssetContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched || urlMatch.params.asset !== "SetLocation") return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, "SetLocation", id));

    const updateAssetInfo = useCallback(
        (asset: AssetDataNames) => (data: AssetInfoToUpdate) => dispatch(assetEditAction({ stage, asset, data })),
        [info.data]
    );

    if (!info.data?.setLocationBundle) return null;

    return (
        <>
            <SetLocationBundle
                loading={info.loading}
                data={info.data.setLocationBundle}
                updateAssetInfo={updateAssetInfo("SetLocationBundle" as AssetDataNames)}
            />
            {info.data.setLocationBundle.characterSpawnPosition.map((el) => (
                <CharacterSpawnPosition
                    key={el.id}
                    stage={stage}
                    loading={info.loading}
                    data={el}
                    updateCharacterSpawnPositios={updateAssetInfo("CharacterSpawnPosition")}
                    updateLightSettings={updateAssetInfo("LightSettings" as AssetDataNames)}
                />
            ))}
        </>
    );
}

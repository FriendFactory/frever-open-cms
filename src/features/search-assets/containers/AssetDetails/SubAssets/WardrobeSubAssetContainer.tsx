import React from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { AssetTypes } from "config";
import { assetEditAction, assetDetailsSelector } from "features/search-assets/store";

import { DETAILS_ASSET_URL } from "urls";
import { AssetFormData } from "shared/services/api";
import { useExtraData } from "shared/hooks/useExtraData";
import { UmaBundle } from "features/search-assets/components/AssetDetails";

export interface WardrobeSubAssetContainerProps {}

export function WardrobeSubAssetContainer({}: WardrobeSubAssetContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched || urlMatch.params.asset !== "Wardrobe") return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, "Wardrobe", id));
    const readinessList = useExtraData({ stage: urlMatch.params.stage, name: "Readiness" });

    const editRequest = (asset: AssetTypes, data: AssetFormData) => dispatch(assetEditAction({ stage, asset, data }));

    if (!info.data?.umaBundle) return null;

    return (
        <UmaBundle
            stage={stage}
            loading={info.loading}
            data={info.data.umaBundle}
            readinessList={readinessList.data ?? []}
            editRequest={editRequest}
        />
    );
}

import React from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { AssetTypes } from "config";
import { assetEditAction, assetDetailsSelector } from "features/search-assets/store";
import { DETAILS_ASSET_URL } from "urls";
import { AssetFormData } from "shared/services/api";
import { useExtraData } from "shared/hooks/useExtraData";
import { CameraFilterVariant } from "features/search-assets/components/AssetDetails";

export interface CamFiltSubAssetContainerProps {}

export function CamFiltSubAssetContainer({}: CamFiltSubAssetContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched || urlMatch.params.asset !== "CameraFilter") return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, "CameraFilter", id));
    const readinessList = useExtraData({ stage: urlMatch.params.stage, name: "Readiness" });

    const editRequest = (asset: AssetTypes, data: AssetFormData) => dispatch(assetEditAction({ stage, asset, data }));

    if (!info.data?.cameraFilterVariant) return null;

    return (
        <>
            {info.data.cameraFilterVariant?.map((el) => (
                <CameraFilterVariant
                    key={el.id}
                    stage={stage}
                    loading={info.loading}
                    data={el}
                    readinessList={readinessList.data ?? []}
                    editRequest={editRequest}
                />
            ))}
        </>
    );
}

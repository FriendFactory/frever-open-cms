import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";

import { DETAILS_ASSET_URL } from "urls";
import { AssetStoreInfo } from "features/search-assets/components/AssetDetails/AssetStoreInfo";
import { assetDetailsSelector, assetOfferLoadAction } from "features/search-assets/store";
import { AssetOfferType, assetsAvailableForOffer } from "features/search-assets/services";
import { assetOfferByAssetSelector } from "features/search-assets/store/reducer/assetOffer/assetOfferByAsset.reducer";

export interface AssetStoreInfoContainerProps {}

export function AssetStoreInfoContainer({}: AssetStoreInfoContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return <Result title="Invalid URL" />;

    const { stage, asset, id } = urlMatch.params;

    const assetOfferType: AssetOfferType | undefined = assetsAvailableForOffer.find((el) => el === asset);

    if (!assetOfferType) return null;

    useEffect(() => {
        dispatch(assetOfferLoadAction({ stage: stage, assetId: id, assetOfferType }));
    }, [id]);

    const info = useSelector(assetOfferByAssetSelector(stage, assetOfferType, id));
    const wardrobe = useSelector(assetDetailsSelector(stage, "Wardrobe", id));

    return (
        <AssetStoreInfo
            loading={!info.data && info.loading}
            data={info?.data}
            stage={stage}
            assetId={id}
            assetType={assetOfferType}
            wardrobe={wardrobe.data}
        />
    );
}

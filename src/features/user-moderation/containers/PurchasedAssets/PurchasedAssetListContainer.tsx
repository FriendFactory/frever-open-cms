import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Alert } from "antd";

import { USER_ASSET_PURCHASES_TAB_URL, DETAILS_ASSET_URL } from "urls";
import { purchasedAssetsPageSelector } from "features/user-moderation/store/reducer/purchasedAssets.reducer";
import { PurchasedAssetList } from "features/user-moderation/components/PurchasedAssets/PurchasedAssetList";
import { PurchasedAsset } from "features/user-moderation/services";
import { AssetTypes } from "config";

export function PurchasedAssetListContainer() {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_ASSET_PURCHASES_TAB_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Error" description="Invalid URL" type="error" showIcon />;

    const info = useSelector(purchasedAssetsPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const onRow = (record: PurchasedAsset) => ({
        onClick: () =>
            history.push(
                DETAILS_ASSET_URL.format({
                    asset: record.assetType as AssetTypes,
                    stage: urlMatch.params.stage,
                    id: record.id
                })
            )
    });

    return (
        <PurchasedAssetList
            loading={info.loading && !info.data}
            data={info.data}
            stage={urlMatch.params.stage}
            onRow={onRow}
        />
    );
}

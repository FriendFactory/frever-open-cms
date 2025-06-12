import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Typography } from "antd";

import { getNxtStageByCurrStageId } from "features/auth";
import { SetLocationAsset } from "features/search-assets/services";
import { DETAILS_ASSET_URL } from "urls";
import {
    assetDetailsSelector,
    runAssetMigrationAction,
    showAssetsDeleteModalAction
} from "features/search-assets/store";
import { DeleteAssociatedVideosContainer } from "./DeleteAssociatedVideosContainer";

const { Link } = Typography;

export function AssetActionsContainer() {
    const dispatch = useDispatch();

    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, asset, id } = urlMatch.params;

    const { data } = useSelector(assetDetailsSelector(stage, asset, id));

    const nextStage = useMemo(() => getNxtStageByCurrStageId(stage), [stage]);

    if (!data || asset === "CharacterSpawnPosition") return null;

    const handleDeleteAsset = () => dispatch(showAssetsDeleteModalAction({ assetToDeleteList: [data] }));

    const executeMigrationPreview = () => {
        const assetToMigrate = asset === "SetLocation" ? (data as SetLocationAsset)?.setLocationBundleId : data.id;

        const assetType = asset === "SetLocation" ? "SetLocationBundle" : asset;

        nextStage?.id &&
            assetToMigrate &&
            dispatch(
                runAssetMigrationAction({
                    params: { operation: "preview", fromStage: stage, toStage: nextStage.id, assetType },
                    assetList: [assetToMigrate]
                })
            );
    };

    return (
        <Space wrap={false} size={16}>
            <Link disabled={!nextStage || stage === "content-prod"} onClick={executeMigrationPreview}>
                Migrate
            </Link>

            <Link disabled={asset === "SetLocation"} type="danger" onClick={handleDeleteAsset}>
                Delete
            </Link>
            {asset === "Song" && <DeleteAssociatedVideosContainer selectBy="songId" id={id} />}
        </Space>
    );
}

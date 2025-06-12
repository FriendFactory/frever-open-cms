import React, { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";

import { AssetTypes } from "config";
import { AssetCommand } from "../../components/AssetsGrid/AssetCommand";
import { AssetData, SetLocationAsset } from "features/search-assets/services";
import { showAssetsDeleteModalAction, runAssetMigrationAction } from "../../store/actions";
import { getNxtStageByCurrStageId } from "features/auth";

export interface AssetCommandContainerProps {
    stage: string;
    assetType: AssetTypes;
    assetList: Array<AssetData[AssetTypes]>;
}

export function AssetCommandContainer({ stage, assetType, assetList }: AssetCommandContainerProps) {
    const dispatch = useDispatch();
    const nextStage = useMemo(() => getNxtStageByCurrStageId(stage), [stage]);

    const handleDeleteAssets = useCallback(() => {
        dispatch(showAssetsDeleteModalAction({ assetToDeleteList: assetList }));
    }, [stage, assetType, assetList]);

    const executeMigrationPreview = useCallback(() => {
        const assetsToDelete =
            assetType === "SetLocation"
                ? assetList.map((el) => (el as SetLocationAsset).setLocationBundleId)
                : assetList.map((el) => el.id);

        const assetName = assetType === "SetLocation" ? "SetLocationBundle" : assetType;

        nextStage?.id &&
            dispatch(
                runAssetMigrationAction({
                    params: { operation: "preview", fromStage: stage, toStage: nextStage.id, assetType: assetName },
                    assetList: assetsToDelete
                })
            );
    }, [stage, assetType, assetList]);

    return (
        <AssetCommand
            stage={stage}
            assetType={assetType}
            deletionDisabled={
                !assetList.length || assetType === "SetLocation" || assetType === "CharacterSpawnPosition"
            }
            migrationDisabled={
                !assetList.length ||
                !nextStage?.id ||
                nextStage.id === "dev-1" ||
                nextStage.id === "dev" ||
                assetType === "CharacterSpawnPosition"
            }
            selectedAssetIds={assetList.map((el) => el.id)}
            handleDeleteAssets={handleDeleteAssets}
            executeMigrationPreview={executeMigrationPreview}
        />
    );
}

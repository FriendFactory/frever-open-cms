import React, { useMemo } from "react";
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/lib/menu/hooks/useItems";

import { AssetTypes } from "config";
import { GlobalUmaBundleMigrate } from "../../containers/GlobalUmaBundleMigrate";

import { assetsAvailableForOffer } from "features/search-assets/services";
import { BulkAssetFormContainer } from "features/search-assets/containers/BulkAssetFormContainer";
import { CreateAssetContainer } from "features/search-assets/containers/CreateAsset/CreateAssetContainer";
import { CreateAssetOfferContainer } from "features/search-assets/containers/AssetOffer/CreateAssetOfferContainer";
import { AddWardrobeToThemeCollectionContainer } from "features/theme-collections/containers/AddWardrobeToThemeCollectionContainer";

export const assetTypesWithTier = ["BodyAnimation", "VFX", "CameraFilter", "SetLocation", "Wardrobe"];

export interface AssetCommandProps {
    assetType: AssetTypes;
    stage: string;
    deletionDisabled: boolean;
    migrationDisabled: boolean;
    selectedAssetIds: number[];
    handleDeleteAssets: () => void;
    executeMigrationPreview: () => void;
}

export function AssetCommand({
    stage,
    assetType,
    deletionDisabled,
    migrationDisabled,
    selectedAssetIds,
    handleDeleteAssets,
    executeMigrationPreview
}: AssetCommandProps) {
    const assetOfferAssetType = useMemo(() => assetsAvailableForOffer.find((el) => el === assetType), [assetType]);

    const items = useMemo(() => {
        const items: MenuItemType[] = [
            {
                key: "migrate-assets",
                label: "Migrate selected",
                disabled: migrationDisabled,
                onClick: executeMigrationPreview
            },
            { key: "delete-asstes", label: "Delete selected", disabled: deletionDisabled, onClick: handleDeleteAssets }
        ];

        if (assetType === "SFX") {
            items.push({
                key: "create-sfx",
                label: (
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        <CreateAssetContainer stage={stage} asset={assetType} />
                    </div>
                )
            });
        }

        if (assetType === "Song") {
            items.push({
                key: "create-song",
                label: (
                    <div onKeyDown={(e) => e.stopPropagation()}>
                        <CreateAssetContainer stage={stage} asset={assetType} />
                    </div>
                )
            });
        }

        if (assetType === "Wardrobe") {
            items.push({ key: "migrate-global-uma", label: <GlobalUmaBundleMigrate stage={stage} /> });
            items.push({
                key: "add-to-theme-collection",
                disabled: !selectedAssetIds.length,
                label: <AddWardrobeToThemeCollectionContainer wardrobeIds={selectedAssetIds} />
            });
        }

        if (assetOfferAssetType) {
            items.push({
                key: "asset-offer",
                disabled: !selectedAssetIds.length,
                label: (
                    <CreateAssetOfferContainer
                        stage={stage}
                        assetHasActiveOffer={false}
                        assetIds={selectedAssetIds}
                        assetType={assetOfferAssetType}
                    />
                )
            });
        }

        if (assetTypesWithTier.some((el) => el === assetType)) {
            items.push({
                key: "bulk-tiering",
                disabled: !selectedAssetIds.length,
                label: <BulkAssetFormContainer stage={stage} assetIds={selectedAssetIds} assetType={assetType} />
            });
        }

        return items;
    }, [stage, assetType, deletionDisabled, migrationDisabled, selectedAssetIds]);

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />}></Button>
        </Dropdown>
    );
}

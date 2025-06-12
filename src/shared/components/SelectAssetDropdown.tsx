import React, { useState } from "react";
import { Button, Dropdown, Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { AssetData, AssetDataNames } from "features/search-assets/services";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";

export interface SelectAssetDropdownProps {
    children: React.ReactNode;
    stage: string;
    menuItems: { key: AssetDataNames; label: string }[];
    onSelect: (assetId: number, assetType: AssetDataNames) => void;
}

export function SelectAssetDropdown({ children, stage, menuItems, onSelect }: SelectAssetDropdownProps) {
    const [asset, setAsset] = useState<AssetDataNames | null>(null);

    const openAssetSearch = (asset: AssetDataNames) => () => setAsset(asset);
    const hideAssetSearch = () => setAsset(null);

    const items = menuItems.map((el) => ({
        key: el.key,
        label: el.label,
        onClick: openAssetSearch(el.key)
    }));

    const handleOnClick = (entity: AssetData[AssetDataNames]) => () => {
        if (asset) {
            onSelect(entity.id, asset);
            hideAssetSearch();
        }
    };

    return (
        <>
            <Dropdown menu={{ items }}>{children}</Dropdown>
            <Modal
                title={menuItems.find((el) => el.key === asset)?.label + " search"}
                width="95%"
                centered
                open={!!asset}
                onCancel={hideAssetSearch}
                destroyOnClose
                footer={false}>
                {asset && (
                    <AssetSearchTableContainer
                        stage={stage}
                        asset={asset}
                        actionColumn={{
                            title: "",
                            width: 65,
                            render: (_, entity) => (
                                <Button type="primary" ghost icon={<CheckOutlined />} onClick={handleOnClick(entity)} />
                            )
                        }}
                    />
                )}
            </Modal>
        </>
    );
}

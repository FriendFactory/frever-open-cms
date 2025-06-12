import React, { useState } from "react";
import { Button, Dropdown, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { AssetData, AssetDataNames, EmotionAssetName } from "features/search-assets/services";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";
import { useCurrentStage } from "shared";

interface AssetListModalContainerProps {
    renderCommandColumn: (entity: AssetData[AssetDataNames], assetType: EmotionAssetName) => React.ReactNode;
}

export function AssetListModalContainer({ renderCommandColumn }: AssetListModalContainerProps) {
    const stage = useCurrentStage();
    const [asset, setAsset] = useState<EmotionAssetName | null>(null);

    const openAssetSearch = (asset: EmotionAssetName) => () => setAsset(asset);
    const hideAssetSearch = () => setAsset(null);

    const items = menuItems.map((el) => ({
        key: el.key,
        label: el.label,
        onClick: openAssetSearch(el.key)
    }));

    return (
        <div>
            <Dropdown menu={{ items }}>
                <Button icon={<SearchOutlined />}>Add asset</Button>
            </Dropdown>
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
                            render: (_, record) => renderCommandColumn(record, asset)
                        }}
                    />
                )}
            </Modal>
        </div>
    );
}

const menuItems: { key: EmotionAssetName; label: string }[] = [
    { key: "Song", label: "Song" },
    { key: "BodyAnimation", label: "Body Animation" }
];

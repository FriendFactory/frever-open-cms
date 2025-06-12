import React from "react";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { UmaAsset } from "features/search-assets/services";
import { AssetFileWardrobeSlotContainer } from "features/search-assets/containers/UmaBundleDetails/AssetFileWardrobeSlotContainer";

export interface AssetFilesProps {
    data: UmaAsset[];
    stage: string;
}

export function AssetFiles({ data, stage }: AssetFilesProps) {
    const columns: ColumnsType<UmaAsset> = [
        {
            width: 150,
            title: "ID",
            render: (_, uAsset) => uAsset.id
        },
        {
            width: 390,
            title: "Asset Name",
            render: (_, uAsset) => uAsset.assetName
        },
        {
            width: 200,
            title: "Asset Hash",
            render: (_, uAsset) => uAsset.assetHash
        },
        {
            width: 170,
            title: "Wardrobe Slot",
            render: (_, uAsset) => (
                <AssetFileWardrobeSlotContainer key={uAsset.assetWardrobeSlotId} stage={stage} data={uAsset} />
            )
        }
    ];

    return (
        <Card title="Asset Files">
            <Table
                rowKey={(uAsset: UmaAsset) => uAsset.id}
                dataSource={data}
                columns={columns}
                pagination={false}
                scroll={{ x: 600 }}
            />
        </Card>
    );
}

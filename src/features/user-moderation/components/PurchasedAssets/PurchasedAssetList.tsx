import React, { useCallback } from "react";
import { Avatar, Table } from "antd";
import dayjs from "dayjs";

import { PurchasedAsset } from "features/user-moderation/services";
import { createCdnURLFromFiles } from "shared";
import { Assets, AssetTypes } from "config";

export interface PurchasedAssetListProps {
    stage: string;
    loading: boolean;
    data?: PurchasedAsset[];
    onRow: (record: PurchasedAsset) => { onClick: () => void };
}

export function PurchasedAssetList({ loading, stage, data, onRow }: PurchasedAssetListProps) {
    const getRowKey = useCallback((asset: PurchasedAsset) => `${asset.assetType}/${asset.id}`, [data]);
    const colums = [
        {
            title: "ID",
            dataIndex: "id",
            width: "100px"
        },
        {
            title: "Asset Type",
            dataIndex: "assetType",
            width: "130px",
            render: (_: unknown, asset: PurchasedAsset) => Assets[asset.assetType as AssetTypes].title
        },
        {
            title: "Thumbnail",
            width: 120,
            render: (_: unknown, asset: PurchasedAsset) => (
                <Avatar
                    shape="square"
                    size={86}
                    src={
                        asset.files.length
                            ? createCdnURLFromFiles({
                                  stage,
                                  id: asset.id,
                                  entityType: asset.assetType,
                                  files: asset.files,
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "200px"
        },

        {
            title: "Purchase Date",
            width: "160px",
            render: (_: unknown, asset: PurchasedAsset) => dayjs.utc(asset.purchaseDate).format("DD MMM YYYY  HH:mm:ss")
        }
    ];

    return (
        <Table
            rowKey={getRowKey}
            onRow={onRow}
            scroll={{ x: 500 }}
            loading={loading}
            dataSource={data}
            columns={colums}
            pagination={false}
        />
    );
}

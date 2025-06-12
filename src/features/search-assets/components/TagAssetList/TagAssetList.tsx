import React from "react";
import { Avatar, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { DETAILS_ASSET_URL } from "urls";
import { CommonExtraDataType, createCdnURLFromFiles, ProtectedLink, readinessColor } from "shared";
import { TagAsset } from "features/search-assets/store/actions";

export interface TagAssetListProps {
    stage: string;
    data: TagAsset[];
    loading: boolean;
    readinessList: CommonExtraDataType[];
}

export function TagAssetList({ data, stage, readinessList, loading }: TagAssetListProps) {
    const columns: ColumnsType<TagAsset> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 225,
            render: (_, asset) => {
                return (
                    <ProtectedLink
                        feature="AssetFull"
                        to={DETAILS_ASSET_URL.format({ stage, asset: asset.assetType, id: asset.id })}>
                        {asset.name}
                    </ProtectedLink>
                );
            }
        },
        {
            title: "Thumbnail",
            width: 120,
            render: (_, asset) => (
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
            title: "Created Time",
            width: 160,
            render: (_, asset) =>
                "createdTime" in asset ? dayjs.utc(asset.createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown"
        },
        {
            title: "Modified Time",
            width: 160,
            render: (_, asset) =>
                "modifiedTime" in asset ? dayjs.utc(asset.modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown"
        },
        {
            width: 155,
            title: "Readiness",
            dataIndex: "readinessId",
            render: (_, asset) =>
                "readinessId" in asset ? (
                    <Tag color={readinessColor[asset.readinessId]}>
                        {readinessList?.find((el) => el.id === asset.readinessId)?.name ?? "Unknown"}
                    </Tag>
                ) : null
        },
        {
            width: 155,
            title: "Asset Type",
            dataIndex: "assetType"
        }
    ];

    return (
        <Table
            loading={loading}
            rowKey={(asset) => asset.id}
            dataSource={data}
            columns={columns}
            pagination={false}
            scroll={{ x: 650 }}
        />
    );
}

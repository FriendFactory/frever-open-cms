import React from "react";
import { Avatar, Card, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import dayjs from "dayjs";

import { createCdnURLFromFiles, CommonExtraDataType, readinessColor, ProtectedLink } from "shared";
import { WardrobeAsset } from "features/search-assets/services";
import { DETAILS_ASSET_URL } from "urls";

export interface UmaWardrobeListProps {
    stage: string;
    data: WardrobeAsset[];
    readinessList: CommonExtraDataType[];
}

export function UmaWardrobeList({ stage, data, readinessList }: UmaWardrobeListProps) {
    const columns: ColumnsType<WardrobeAsset> = [
        {
            width: 150,
            title: "ID",
            render: (_, asset) => asset.id
        },
        {
            width: 300,
            title: "Name",
            render: (_, asset) => (
                <ProtectedLink
                    feature="AssetFull"
                    to={DETAILS_ASSET_URL.format({ stage, asset: "Wardrobe", id: asset.id })}>
                    {asset.name}
                </ProtectedLink>
            )
        },
        {
            width: 100,
            title: "Thumbnail",
            render: (_, asset) => (
                <Avatar
                    shape="square"
                    size={60}
                    src={
                        asset.files.length
                            ? createCdnURLFromFiles({
                                  stage,
                                  id: asset.id,
                                  entityType: "Wardrobe",
                                  files: asset.files,
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            width: 170,
            title: "Created Time",
            render: (_, asset) =>
                asset.createdTime ? dayjs.utc(asset.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        },
        {
            width: 170,
            title: "Modified Time",
            render: (_, asset) =>
                asset.modifiedTime ? dayjs.utc(asset.modifiedTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"
        },
        {
            width: 230,
            title: "Readiness",
            render: (_, asset) => (
                <Tag color={readinessColor[asset.readinessId]}>
                    {readinessList.find((el) => el.id === asset.readinessId)?.name ?? "Unknown"}
                </Tag>
            )
        }
    ];

    return (
        <Card title="Wardrobe List">
            <Table
                rowKey={(asset: WardrobeAsset) => asset.id}
                dataSource={data}
                columns={columns}
                pagination={false}
                scroll={{ x: 600 }}
            />
        </Card>
    );
}

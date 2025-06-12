import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";

import { DETAILS_ASSET_URL } from "urls";
import { createCdnURLFromFiles, ProtectedLink, useColumnSearch, useCurrentStage } from "shared";
import { NonBakeableWardrobe } from "../services/api";
import { charactersBakingDetailsPageSelector } from "../store/reducer";

export function NonBakeableWardrobeList() {
    const stage = useCurrentStage();
    const info = useSelector(charactersBakingDetailsPageSelector(stage));
    const { getColumnSearchProps } = useColumnSearch();

    const columns: ColumnsType<NonBakeableWardrobe> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            render: (_: unknown, entity) => (
                <ProtectedLink
                    feature="AssetFull"
                    to={DETAILS_ASSET_URL.format({ stage, asset: "Wardrobe", id: entity.id })}>
                    {entity.id}
                </ProtectedLink>
            ),
            ...getColumnSearchProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 120,
            ...getColumnSearchProps("name")
        },
        {
            title: "Thumbnail",
            width: 100,
            render: (_: unknown, entity) => (
                <Avatar
                    shape="square"
                    size={80}
                    src={
                        entity.files.length
                            ? createCdnURLFromFiles({
                                  stage,
                                  id: entity.id,
                                  files: entity.files,
                                  entityType: "Wardrobe",
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Used by Characters",
            dataIndex: "usedByCharacterCount",
            width: 100,
            sorter: (a, b) => a.usedByCharacterCount - b.usedByCharacterCount,
            sortDirections: ["descend", "ascend"]
        },
        {
            title: "Usage Frequency",
            dataIndex: "usagePercentage",
            width: 100,
            render: (_, entity) => `${entity.usagePercentage.toFixed(2)}%`,
            sorter: (a, b) => a.usagePercentage - b.usagePercentage,
            sortDirections: ["descend", "ascend"]
        }
    ];

    return (
        <Card title={`Non-Bakeable Wardrobes (${info.data?.nonBakeableWardrobes?.length ?? 0})`} loading={false}>
            <Table
                rowKey="id"
                scroll={{ x: 700 }}
                loading={info.loading}
                dataSource={info.data?.nonBakeableWardrobes}
                columns={columns}
                pagination={false}
            />
        </Card>
    );
}

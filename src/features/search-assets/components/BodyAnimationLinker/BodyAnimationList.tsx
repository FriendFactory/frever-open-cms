import React, { useCallback } from "react";
import { Table } from "antd";
import { RowSelectionType } from "antd/lib/table/interface";
import Avatar from "antd/lib/avatar/avatar";

import { BodyAnimationAsset } from "features/search-assets/services";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL } from "urls";

export interface BodyAnimationListProps {
    stage: string;
    loading: boolean;
    data: BodyAnimationAsset[];
    rowSelection: {
        type: RowSelectionType;
        onSelect: (record: BodyAnimationAsset) => void;
        selectedRowKeys: string[];
    };
}
export function BodyAnimationList({ stage, loading, data, rowSelection }: BodyAnimationListProps) {
    const getRowKey = useCallback((row: BodyAnimationAsset) => row.id.toString(), [data]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: "130px"
        },
        {
            title: "Thumbnail",
            width: "120px",
            align: "center" as "center",
            render: (_: unknown, { id, files }: BodyAnimationAsset) => (
                <Avatar
                    size={86}
                    shape="square"
                    src={createCdnURLFromFiles({
                        stage,
                        id,
                        files,
                        entityType: "BodyAnimation",
                        resolution: "128x128"
                    })}
                />
            )
        },
        {
            title: "Name",
            width: "220px",
            render: (_: unknown, { id, name }: BodyAnimationAsset) => (
                <ProtectedLink feature="AssetFull" to={DETAILS_ASSET_URL.format({ stage, asset: "BodyAnimation", id })}>
                    {name}
                </ProtectedLink>
            )
        }
    ];
    return (
        <Table
            rowKey={getRowKey}
            bordered
            dataSource={data}
            loading={loading}
            columns={columns}
            pagination={false}
            scroll={{ x: "400px" }}
            rowSelection={rowSelection}
        />
    );
}

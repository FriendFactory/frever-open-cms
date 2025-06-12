import React, { useCallback } from "react";
import { Table } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { RowSelectionType } from "antd/lib/table/interface";

import { CharacterSpawnPosition } from "features/search-assets/services";
import { createCdnURLFromFiles } from "shared";

export interface CharaSpawnPosListProps {
    stage: string;
    loading: boolean;
    data: CharacterSpawnPosition[];
    rowSelection: {
        type: RowSelectionType;
        onSelect: (_record: CharacterSpawnPosition, _selected: boolean, selectedRows: CharacterSpawnPosition[]) => void;
        selectedRowKeys: string[];
    };
}
export function CharaSpawnPosList({ stage, loading, data, rowSelection }: CharaSpawnPosListProps) {
    const getRowKey = useCallback((row: CharacterSpawnPosition) => row.id.toString(), [data]);

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
            render: (_: unknown, { id, files }: CharacterSpawnPosition) => (
                <Avatar
                    size={86}
                    shape="square"
                    src={createCdnURLFromFiles({
                        stage,
                        id,
                        files,
                        entityType: "CharacterSpawnPosition",
                        resolution: "128x128"
                    })}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            width: "220px",
            render: (_: unknown, asset: CharacterSpawnPosition) =>
                `${asset.name} (${asset.setLocationBundle?.name ?? ""})`
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

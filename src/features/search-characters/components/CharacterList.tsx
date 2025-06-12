import React, { useCallback } from "react";
import { Avatar, Badge, Table } from "antd";
import { ColumnsType, SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";

import { Character } from "features/user-moderation/services";
import { createCdnURLFromFiles } from "shared";
import { GetCharacterListParams } from "../services";
import { createSortableColumnProps } from "shared";

export interface CharacterListProps {
    stage: string;
    data: Character[];
    loading: boolean;
    orderBy: GetCharacterListParams["orderBy"];
    sortDirection: GetCharacterListParams["sortDirection"];
    onSort: (
        orderBy: GetCharacterListParams["orderBy"],
        sortDirection: GetCharacterListParams["sortDirection"]
    ) => void;
    onRow: (chara: Character) => { onClick: () => void };
}

export function CharacterList({ stage, data, loading, orderBy, sortDirection, onSort, onRow }: CharacterListProps) {
    const sortableProps = createSortableColumnProps<GetCharacterListParams["orderBy"]>(orderBy, sortDirection);

    const handleOnChange = useCallback(
        (_paging: unknown, _filter: unknown, sorter: SorterResult<any>) => {
            if (sorter.columnKey) {
                if (sorter.order === undefined) {
                    onSort(undefined, undefined);
                } else {
                    onSort(sorter.columnKey as any, sorter.order === "ascend" ? "asc" : "desc");
                }
            }
        },
        [onSort]
    );

    const columns: ColumnsType<Character> = [
        {
            width: 100,
            title: "ID",
            render: (_, chara) => chara.id ?? "Unknown",
            ...sortableProps("id")
        },
        {
            width: 120,
            title: "Thumbnail",
            render: (_, { id, files }) => (
                <Avatar
                    shape="square"
                    size={86}
                    src={createCdnURLFromFiles({
                        id,
                        files,
                        stage,
                        entityType: "character",
                        resolution: "128x128"
                    })}
                />
            )
        },
        {
            width: 120,
            title: "Name",
            render: (_, chara) => chara.name ?? "Unknown",
            ...sortableProps("name")
        },
        {
            width: 120,
            title: "GroupID",
            render: (_, chara) => chara.groupId ?? "Unknown",
            ...sortableProps("groupId")
        },
        {
            width: 100,
            title: "Default",
            render: (_, chara) => (chara.isDefault ? "Yes" : "No")
        },
        {
            width: 200,
            title: "Created At",
            render: (_, chara) =>
                chara.createdTime ? dayjs.utc(chara.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown",
            ...sortableProps("createdTime")
        },
        {
            width: 200,
            title: "Modify At",
            render: (_, chara) =>
                chara.modifiedTime ? dayjs.utc(chara.modifiedTime).format("DD MMM YYYY HH:mm:ss") : "Unknown",
            ...sortableProps("modifiedTime")
        },
        {
            width: 120,
            title: "Status",
            render: (_, chara) =>
                chara.isDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />
        }
    ];

    return (
        <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={(row: Character) => row.id}
            onRow={onRow}
            onChange={handleOnChange as any}
            pagination={false}
            scroll={{ x: 700 }}
        />
    );
}

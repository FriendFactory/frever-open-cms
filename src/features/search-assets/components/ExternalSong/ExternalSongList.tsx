import React, { useCallback } from "react";
import { Badge, Table } from "antd";
import { ColumnType, SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";

import { ExternalSong, ExternalSongListQueryParams } from "features/search-assets/services";
import { useExtraData } from "shared";
import { ExtraDataResult } from "shared/store";
import { ExternalSongListExpandedRow } from "./ExternalSongListExpandedRow";
import { ExternalSongListCommandsContainer } from "features/search-assets/containers/ExternalSongList/ExternalSongListCommandsContainer";

export interface ExternalSongListProps {
    stage: string;
    data?: ExternalSong[];
    loading: boolean;
    orderBy?: ExternalSongListQueryParams["orderBy"];
    sortDirection?: ExternalSongListQueryParams["sortDirection"];
    handleOnRow: (record: ExternalSong) => { onClick: () => void };
    onSort: (
        orderBy: ExternalSongListQueryParams["orderBy"],
        sortDirection: ExternalSongListQueryParams["sortDirection"]
    ) => void;
}

export function ExternalSongList({
    stage,
    data,
    loading,
    orderBy,
    sortDirection,
    onSort,
    handleOnRow
}: ExternalSongListProps) {
    const countries = useExtraData({ stage, name: "Country" });

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

    const columns: ColumnType<ExternalSong>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id", orderBy, sortDirection)
        },
        {
            title: "Song Name",
            dataIndex: "songName",
            width: 150,
            ellipsis: true,
            ...sortableColumnProps("songName", orderBy, sortDirection)
        },
        {
            title: "Artist Name",
            dataIndex: "artistName",
            width: 130,
            ellipsis: true,
            ...sortableColumnProps("artistName", orderBy, sortDirection)
        },
        {
            title: "ISRC",
            dataIndex: "isrc",
            width: 135
        },
        {
            title: "Last License Check",
            width: 170,
            render: (_, ent) =>
                ent.lastLicenseStatusCheckAt
                    ? dayjs.utc(ent.lastLicenseStatusCheckAt).format("DD MMM YYYY HH:mm:ss")
                    : "",
            ...sortableColumnProps("lastLicenseStatusCheckAt", orderBy, sortDirection)
        },
        {
            title: "Uncleared Since",
            width: 170,
            render: (_, ent) =>
                ent.notClearedSince ? dayjs.utc(ent.notClearedSince).format("DD MMM YYYY HH:mm:ss") : ""
        },
        {
            title: "Challenge Sort Order",
            dataIndex: "challengeSortOrder",
            align: "center",
            width: 130,
            ...sortableColumnProps("challengeSortOrder", orderBy, sortDirection)
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            align: "center",
            width: 100,
            ...sortableColumnProps("sortOrder", orderBy, sortDirection)
        },
        {
            title: "Manually Deleted",
            width: 100,
            render: (_, ent) =>
                ent.isManuallyDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />
        },
        {
            title: "Status",
            width: 100,
            render: (_, ent) =>
                ent.isDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />
        },
        {
            title: "",
            align: "right",
            fixed: "right",
            width: 65,
            render: (_, { id, isDeleted, isManuallyDeleted }) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <ExternalSongListCommandsContainer
                        id={id}
                        isDeleted={isDeleted}
                        isManuallyDeleted={isManuallyDeleted}
                    />
                </div>
            )
        }
    ];

    return (
        <Table
            sticky
            rowKey="id"
            loading={loading}
            pagination={false}
            dataSource={data}
            columns={columns}
            scroll={{ x: 600 }}
            onChange={handleOnChange as any}
            onRow={handleOnRow}
            expandable={{
                expandedRowRender: (record) => (
                    <ExternalSongListExpandedRow
                        data={record}
                        excludedCountries={countryNamesByISONames(countries.data, record.excludedCountries) ?? []}
                    />
                ),
                fixed: "left"
            }}
        />
    );
}

const sortableColumnProps = (
    column: ExternalSongListQueryParams["orderBy"],
    orderBy?: ExternalSongListQueryParams["orderBy"],
    sortDirection?: ExternalSongListQueryParams["sortDirection"]
): { key?: string; sorter: any; sortOrder?: "ascend" | "descend" | null } => {
    if (!column) {
        return {
            sorter: false
        };
    }

    return {
        key: column,
        sorter: true,
        sortOrder: column === orderBy ? (sortDirection === "asc" ? "ascend" : "descend") : undefined
    };
};

export const countryNamesByISONames = (countries: ExtraDataResult<"Country">["data"], isoNames: string[]) =>
    countries
        ?.filter((country) => isoNames.includes(country.isoName))
        .map((country) => country.displayName)
        ?.sort();

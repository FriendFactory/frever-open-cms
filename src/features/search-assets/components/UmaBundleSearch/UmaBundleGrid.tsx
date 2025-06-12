import React, { useCallback } from "react";
import { Table, Tag } from "antd";
import { ColumnsType, FilterValue, SorterResult } from "antd/lib/table/interface";

import { UmaBudnleListQueryParams, UmaBundle } from "features/search-assets/services";
import { CommonExtraDataType, readinessColor } from "shared";

const umaBundleType = [
    {
        id: 1,
        name: "Individual"
    },
    {
        id: 2,
        name: "Variation Base"
    },
    {
        id: 3,
        name: "Global"
    }
];

export interface UmaBundleGridProps {
    data: UmaBundle[];
    readinessList: CommonExtraDataType[];
    loading: boolean;
    sortDirection: UmaBudnleListQueryParams["sortDirection"];
    orderBy: UmaBudnleListQueryParams["orderBy"];
    readinessFilter?: string;
    bundleTypeFilter?: string;
    handleTableOnChange: (
        _paging: unknown,
        filter: Record<string, FilterValue | null>,
        sorter: SorterResult<any>
    ) => void;
    onRow: (record: UmaBundle) => { onClick: () => void };
}

export function UmaBundleGrid({
    data,
    loading,
    orderBy,
    sortDirection,
    readinessList,
    readinessFilter,
    bundleTypeFilter,
    handleTableOnChange,
    onRow
}: UmaBundleGridProps) {
    const sortableColumnProps = useCallback(
        (
            column: UmaBudnleListQueryParams["orderBy"]
        ): { key?: string; sorter: any; sortOrder?: "ascend" | "descend" | null } =>
            !column
                ? { sorter: false }
                : {
                      key: column,
                      sorter: true,
                      sortOrder: column === orderBy ? (sortDirection === "asc" ? "ascend" : "descend") : undefined
                  },
        [orderBy, sortDirection]
    );

    const columns: ColumnsType<UmaBundle> = [
        {
            title: "ID",
            width: 200,
            render: (_, umaBundle) => umaBundle.id,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            width: 450,
            render: (_, umaBundle) => umaBundle.assetBundleName,
            ...sortableColumnProps("assetBundleName")
        },
        {
            title: "Bundle Type",
            key: "bundleType",
            width: 300,
            filters: umaBundleType.map((el) => ({ value: el.id, text: el.name })),
            defaultFilteredValue: bundleTypeFilter?.split(","),
            render: (_, umaBundle) => umaBundle.umaBundleType.name
        },
        {
            title: "Readiness",
            key: "readiness",
            width: 300,
            filters: readinessList.map((el) => ({ value: el.id, text: el.name })),
            defaultFilteredValue: readinessFilter?.split(","),
            render: (_, umaBundle) => (
                <Tag color={readinessColor[umaBundle.readinessId]}>
                    {readinessList.find((el) => el.id === umaBundle.readinessId)?.name ?? "Unknown"}
                </Tag>
            )
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            rowKey={(row: UmaBundle) => row.id}
            onChange={handleTableOnChange as any}
            onRow={onRow}
            scroll={{ x: 800 }}
        />
    );
}

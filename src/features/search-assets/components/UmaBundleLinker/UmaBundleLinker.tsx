import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { UmaBundle } from "features/search-assets/services";
import { UMA_BUNDLE_DETAILS_URL } from "urls";
import { ProtectedLink } from "shared";

export interface UmaBundleListProps {
    stage: string;
    data: UmaBundle[];
    loading: boolean;
    selectedValue?: number;
    handleSelectBundle: (value: UmaBundle) => void;
}

export function UmaBundleList({ stage, data, loading, selectedValue, handleSelectBundle }: UmaBundleListProps) {
    const columns: ColumnsType<UmaBundle> = [
        {
            title: "ID",
            render: (_, umaBundle) => (
                <ProtectedLink feature="AssetFull" to={UMA_BUNDLE_DETAILS_URL.format({ stage, id: umaBundle.id })}>
                    {umaBundle.id}
                </ProtectedLink>
            )
        },
        {
            title: "Name",
            render: (_, umaBundle) => umaBundle.assetBundleName
        }
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            rowKey={(row: UmaBundle) => row.id}
            bordered
            rowSelection={{
                type: "radio",
                selectedRowKeys: selectedValue ? [selectedValue] : [],
                onChange: (_: React.Key[], selectedRows: UmaBundle[]) => handleSelectBundle(selectedRows[0])
            }}
        />
    );
}

import React from "react";
import { useHistory } from "react-router";
import { Table } from "antd";

import { UmaSharedColor, useCurrentStage, useExtendedEditableColumns } from "shared";
import { UMA_SHARED_COLOR_DETAILS_URL } from "urls";
import { useExtraData } from "shared/hooks/useExtraData";
import { getCategoriesColumns } from "features/categories-moderation/columns";

export function UmaColorListContainer() {
    const stage = useCurrentStage();

    const history = useHistory();

    const info = useExtraData({ stage, name: "UmaSharedColor" });

    const { columns, loading } = useExtendedEditableColumns(getCategoriesColumns("UmaSharedColor"));

    const handleOnRow = (record: UmaSharedColor) => ({
        onClick: () => history.push(UMA_SHARED_COLOR_DETAILS_URL.format({ stage, id: record.id }))
    });

    return (
        <Table
            rowKey="id"
            loading={info.loading || loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            onRow={handleOnRow}
        />
    );
}

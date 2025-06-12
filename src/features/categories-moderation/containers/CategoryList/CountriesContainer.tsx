import React from "react";

import { Country, useCurrentStage, useExtendedEditableColumns } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { EditableTableV2 } from "shared/components/EditableTableV2/EditableTableV2";

import { getCategoriesColumns } from "features/categories-moderation/columns";
import { useDispatch } from "react-redux";
import { updateEntityAction } from "shared/store";

export function CountriesContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const info = useExtraData({ stage, name: "Country" });
    const { columns, loading } = useExtendedEditableColumns(getCategoriesColumns("Country"));

    const handleOnFinish = (formData: Partial<Country>[]) => {
        dispatch(
            updateEntityAction({
                stage,
                entityName: "Country",
                data: { ...formData[0] }
            })
        );
    };

    return (
        <EditableTableV2
            rowKey="id"
            loading={info.loading || loading}
            dataSource={info.data}
            columns={columns}
            scroll={{ x: 600, y: "100%" }}
            rowSelection={undefined}
            onFinish={handleOnFinish}
        />
    );
}

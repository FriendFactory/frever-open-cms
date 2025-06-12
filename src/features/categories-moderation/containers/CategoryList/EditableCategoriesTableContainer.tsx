import React from "react";
import { useDispatch } from "react-redux";

import { updateEntityAction } from "shared/store";
import { useExtraData, ExtraDataType, useExtendedEditableColumns, Genre } from "shared";
import { getCategoriesColumns } from "features/categories-moderation/columns";
import { EditableTableV2 } from "shared/components/EditableTableV2/EditableTableV2";
import { CreateCategoryModalContainer } from "../CreateCategoryModalContainer";
import { CategoryTypes } from "config";

export interface EditableCategoriesTableContainerProps {
    stage: string;
    category: CategoryTypes;
}

export function EditableCategoriesTableContainer({
    stage,
    category,
    ...tableProps
}: EditableCategoriesTableContainerProps) {
    const dispatch = useDispatch();
    const info = useExtraData({ stage, name: category });
    const { columns, loading } = useExtendedEditableColumns(getCategoriesColumns(category));

    const handleOnFinish = (data: Partial<ExtraDataType>[]) =>
        dispatch(updateEntityAction({ stage, entityName: category, data }));

    let data = info.data;
    if (category === "Genre") {
        data = (data as Genre[])?.map((genre) => ({
            ...genre,
            countries: genre.countries ?? undefined
        }));
    }

    return (
        <EditableTableV2
            {...tableProps}
            loading={info.loading || loading}
            scroll={{ x: 600, y: "100vh - 264px" }}
            rowKey="id"
            rowSelection={undefined}
            dataSource={data}
            columns={[
                ...columns,
                {
                    title: <CreateCategoryModalContainer category={category} />,
                    width: 64,
                    align: "right",
                    fixed: "right"
                }
            ]}
            onFinish={handleOnFinish}
        />
    );
}

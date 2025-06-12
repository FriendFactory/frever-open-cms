import React from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { useExtraData } from "shared/hooks/useExtraData";
import { ExtendedEditableColumn, useCurrentStage, useExtendedEditableColumns } from "shared";
import { updateEntityAction } from "shared/store";

import { EditableTableV2 } from "shared/components/EditableTableV2/EditableTableV2";
import { idColumn, nameColumn, sortOrderColumn } from "features/categories-moderation/columns/sharedColumns";
import {
    keyColumn,
    wardrobeSubCategoryAndUmaAdjustmentColumn,
    NormalizedUMAAdjustment
} from "features/categories-moderation/columns/umaAdjustment";
import { CreateCategoryModalContainer } from "../CreateCategoryModalContainer";

export function UMAAdjustmentContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const info = useExtraData({ stage, name: "UMAAdjustment" });
    const { columns, loading } = useExtendedEditableColumns(sourceColumns);

    const normalizedData: NormalizedUMAAdjustment[] | undefined = info.data?.map((umaAdjustment) => ({
        ...umaAdjustment,
        wardrobeSubCategoryAndUmaAdjustment: umaAdjustment.wardrobeSubCategoryAndUmaAdjustment.map(
            (el) => el.wardrobeSubCategoryId
        )
    }));

    const handleOnFinish = (list: Partial<NormalizedUMAAdjustment>[]) => {
        const data = list
            .map((data) => {
                const sourceValue = info.data?.find((el) => data.id === el.id);

                if (!sourceValue) {
                    message.error("Something went wrong. Source Value is missing. (UMAAdjustmentContainer - onFinish)");
                    return;
                }

                const wardrobeSubCategoryAndUmaAdjustment = handleWardrobeSubCategoryAndUmaAdjustment(
                    sourceValue?.wardrobeSubCategoryAndUmaAdjustment.map((el) => el.wardrobeSubCategoryId) || [],
                    data.wardrobeSubCategoryAndUmaAdjustment!
                );

                return { ...data, wardrobeSubCategoryAndUmaAdjustment };
            })
            .filter(Boolean);

        dispatch(
            updateEntityAction({
                stage,
                entityName: "UMAAdjustment",
                data,
                withListUpdate: true
            })
        );
    };

    return (
        <EditableTableV2
            loading={info.loading || loading}
            dataSource={normalizedData}
            columns={[
                ...columns,
                {
                    title: <CreateCategoryModalContainer category="UMAAdjustment" />,
                    width: 64,
                    align: "right",
                    fixed: "right"
                }
            ]}
            onFinish={handleOnFinish}
            scroll={{ x: 600 }}
            pagination={false}
        />
    );
}

const handleWardrobeSubCategoryAndUmaAdjustment = (sourceValue: number[], newValue: number[]) => {
    const uniqueValues: { wardrobeSubCategoryId: number }[] = [];

    sourceValue.forEach((wardrobeSubCategoryId) => {
        if (!newValue.some((el) => el === wardrobeSubCategoryId)) {
            uniqueValues.push({ wardrobeSubCategoryId: -wardrobeSubCategoryId });
        }
    });

    newValue.forEach((wardrobeSubCategoryId) => {
        if (!sourceValue.some((el) => el === wardrobeSubCategoryId)) {
            uniqueValues.push({ wardrobeSubCategoryId });
        }
    });

    return uniqueValues;
};

const sourceColumns: ExtendedEditableColumn<NormalizedUMAAdjustment>[] = [
    idColumn,
    nameColumn,
    keyColumn,
    wardrobeSubCategoryAndUmaAdjustmentColumn,
    sortOrderColumn
];

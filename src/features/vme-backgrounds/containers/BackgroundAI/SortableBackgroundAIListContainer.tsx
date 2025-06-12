import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { FixedPageHeader } from "shared";
import { BackgroundAIQueryParams } from "features/vme-backgrounds/services/BackgroundAI/getBackgroundsAI";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { backgroundAIListSelector } from "features/vme-backgrounds";
import {
    runBackgroundAIMigrationAction,
    upsertBackgroundAIAction,
    upsertSingleBackgroundAIAction
} from "features/vme-backgrounds/store/actions/BackgroundAI";
import { SortableBackgroundAIList } from "features/vme-backgrounds/components/BackgroundAI";
import { CreateBackgroundAIFormContainer } from "./CreateBackgroundAIFormContainer";
import { getNxtStageByCurrStageId } from "features/auth";
import { BackgroundAIMigrationContainer } from "./BackgroundAIMigrationContainer";

interface SortableBackgroundAIListContainerProps {
    stage: string;
    params?: BackgroundAIQueryParams;
}

export function SortableBackgroundAIListContainer({ stage, params }: SortableBackgroundAIListContainerProps) {
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState<BackgroundAI[]>([]);
    const [itemsToUpdate, setItemsToUpdate] = useState<BackgroundAI[]>([]);
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);
    const info = useSelector(backgroundAIListSelector(stage, params || {}));

    const nextStage = getNxtStageByCurrStageId(stage);
    let data = mergeItems(info.data, itemsToUpdate) || [];

    if (params?.orderBy === "sortOrder" && params.sortDirection === "asc") data = sortItems(data);

    const save = () => {
        setIsSaveHeaderOpen(false);
        dispatch(upsertBackgroundAIAction({ stage, items: itemsToUpdate }));
    };

    const cancel = () => {
        setItemsToUpdate([]);
        setIsSaveHeaderOpen(false);
    };

    const handleOnUpdateValue = (item: BackgroundAI, newSortOrder: number | null) => {
        if (item.sortOrder === newSortOrder || !data) return;

        setIsSaveHeaderOpen(true);
        setItemsToUpdate(updateList({ item, newSortOrder, items: data, itemsToUpdate }).itemsToUpdate);
    };

    const handleDelete = (data: BackgroundAI) =>
        dispatch(upsertSingleBackgroundAIAction({ stage, data: { item: { ...data, isEnabled: !data.isEnabled } } }));

    const handleSelected = (item: BackgroundAI) => {
        if (selectedItems.includes(item)) setSelectedItems(selectedItems.filter((i) => i !== item));
        else setSelectedItems([...selectedItems, item]);
    };

    const executeMigrationPreview = useCallback(() => {
        const backgroundsIds = selectedItems.map((item) => item.id);

        nextStage?.id &&
            dispatch(
                runBackgroundAIMigrationAction({
                    params: {
                        operation: "preview",
                        fromStage: stage,
                        toStage: nextStage.id,
                        entityType: "SetLocationBackgroundSettings"
                    },
                    backgroundsIds: backgroundsIds
                })
            );
    }, [stage, selectedItems]);

    const items: MenuProps["items"] = [
        {
            label: "Migrate Selected",
            key: "export",
            disabled: !selectedItems.length || !nextStage?.id || nextStage.id === "dev",
            onClick: executeMigrationPreview
        }
    ];

    return (
        <>
            <SortableBackgroundAIList
                header={
                    <Flex justify="flex-end">
                        <Space.Compact>
                            <CreateBackgroundAIFormContainer />
                            <Dropdown menu={{ items }}>
                                <Button ghost type="primary" icon={<MoreOutlined />} />
                            </Dropdown>
                        </Space.Compact>
                    </Flex>
                }
                dataSource={data}
                loading={info.loading}
                selectedItems={selectedItems}
                handleSelected={handleSelected}
                onUpdateValue={handleOnUpdateValue}
                onDelete={handleDelete}
            />

            <FixedPageHeader
                open={isSaveHeaderOpen}
                title="Unsaved sorting changes"
                extra={[
                    <Button key="cancel" onClick={cancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={save}>
                        Save
                    </Button>
                ]}
            />

            <BackgroundAIMigrationContainer />
        </>
    );
}

export interface UpdateListParams {
    item: BackgroundAI;
    newSortOrder: number | null;
    items: BackgroundAI[];
    itemsToUpdate: BackgroundAI[];
}

export const updateList = ({
    item,
    newSortOrder,
    items,
    itemsToUpdate
}: UpdateListParams): { newItemList: BackgroundAI[]; itemsToUpdate: BackgroundAI[] } => {
    const newItem: BackgroundAI = { ...item, sortOrder: newSortOrder };
    const newItemList = items.map((el) => (el.id === item.id ? newItem : el));

    const newListToUpdate = [...itemsToUpdate];
    const indexOfInListToUpdate = newListToUpdate.findIndex((el) => el.id === newItem.id);

    indexOfInListToUpdate !== -1 ? (newListToUpdate[indexOfInListToUpdate] = newItem) : newListToUpdate.push(newItem);

    const oldValue = newSortOrder ? items.find((el) => el.sortOrder === newSortOrder) : undefined;
    if (oldValue && newSortOrder) {
        return updateList({
            item: oldValue,
            newSortOrder: newSortOrder + 1,
            items: newItemList,
            itemsToUpdate: newListToUpdate
        });
    }

    return { newItemList, itemsToUpdate: newListToUpdate };
};

const mergeItems = (sourceItems: BackgroundAI[] | undefined, updatedItems: BackgroundAI[]) =>
    sourceItems?.map((sourceEntity) => {
        const updated = updatedItems.find((updatedValues) => sourceEntity.id === updatedValues.id);
        return updated ? { ...sourceEntity, ...updated } : sourceEntity;
    });

const sortItems = (items: BackgroundAI[]) =>
    items
        .sort((a, b) => b.id - a.id)
        .sort((a, b) => (a.sortOrder === null ? 1 : b.sortOrder === null ? -1 : a.sortOrder - b.sortOrder));

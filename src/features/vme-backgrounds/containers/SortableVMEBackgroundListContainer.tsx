import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { FixedPageHeader } from "shared";
import { VMEBackground, VMEBackgroundQueryParams } from "../services";
import { SortableVMEBackgroundList } from "../components/SortableVMEBackgroundList";
import { vmeBackgroundListSelector } from "../store/reducer/vmeBackgroundListReducer";
import { upsertSingleVMEBackgroundAction, upsertVMEBackgroundAction } from "../store/actions";

interface SortableVMEBackgroundListContainerProps {
    stage: string;
    params?: VMEBackgroundQueryParams;
}

export function SortableVMEBackgroundListContainer({ stage, params }: SortableVMEBackgroundListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(vmeBackgroundListSelector(stage, params || {}));

    const [itemsToUpdate, setItemsToUpdate] = useState<VMEBackground[]>([]);
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);

    let data = mergeItems(info.data, itemsToUpdate) || [];

    if (params?.orderBy === "sortOrder" && params.sortDirection === "asc") data = sortItems(data);

    const save = () => {
        setIsSaveHeaderOpen(false);
        dispatch(upsertVMEBackgroundAction({ stage, items: itemsToUpdate }));
    };

    const cancel = () => {
        setItemsToUpdate([]);
        setIsSaveHeaderOpen(false);
    };

    useEffect(() => cancel, [stage]);

    const handleOnUpdateValue = (item: VMEBackground, newSortOrder: number | null) => {
        if (item.sortOrder === newSortOrder || !data) return;

        setIsSaveHeaderOpen(true);
        setItemsToUpdate(updateList({ item, newSortOrder, items: data, itemsToUpdate }).itemsToUpdate);
    };

    const handleDelete = (data: VMEBackground) =>
        dispatch(upsertSingleVMEBackgroundAction({ stage, data: { item: { ...data, isEnabled: !data.isEnabled } } }));

    return (
        <Fragment>
            <SortableVMEBackgroundList
                data={data}
                loading={info.loading}
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
        </Fragment>
    );
}

export interface UpdateListParams {
    item: VMEBackground;
    newSortOrder: number | null;
    items: VMEBackground[];
    itemsToUpdate: VMEBackground[];
}

export const updateList = ({
    item,
    newSortOrder,
    items,
    itemsToUpdate
}: UpdateListParams): { newItemList: VMEBackground[]; itemsToUpdate: VMEBackground[] } => {
    const newItem: VMEBackground = { ...item, sortOrder: newSortOrder };
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

const mergeItems = (sourceItems: VMEBackground[] | undefined, updatedItems: VMEBackground[]) =>
    sourceItems?.map((sourceEntity) => {
        const updated = updatedItems.find((updatedValues) => sourceEntity.id === updatedValues.id);
        return updated ? { ...sourceEntity, ...updated } : sourceEntity;
    });

const sortItems = (items: VMEBackground[]) =>
    items
        .sort((a, b) => b.id - a.id)
        .sort((a, b) => (a.sortOrder === null ? 1 : b.sortOrder === null ? -1 : a.sortOrder - b.sortOrder));

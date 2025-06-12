import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

import { FixedPageHeader } from "shared";
import { SortableThemeCollectionList } from "../components/SortableThemeCollectionList";
import { ThemeCollection, ThemeCollectionsQueryParams } from "../services";
import { themeCollectionListPageSelector } from "../store/reducer/collectionListReducer";
import { upsertCollectionsAction } from "../store/actions";

interface SortableThemeCollectionListContainerProps {
    stage: string;
    params?: ThemeCollectionsQueryParams;
}

export function SortableThemeCollectionListContainer({ stage, params }: SortableThemeCollectionListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(themeCollectionListPageSelector(stage, params || {}, true));

    const [itemsToUpdate, setItemsToUpdate] = useState<ThemeCollection[]>([]);
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);

    let data = mergeItems(info.data, itemsToUpdate) || [];
    if (params?.orderBy === "sortOrder" && params.sortDirection === "asc") data = sortItems(data);

    const save = () => {
        setIsSaveHeaderOpen(false);
        dispatch(upsertCollectionsAction({ stage, items: itemsToUpdate }));
    };

    const cancel = () => {
        setItemsToUpdate([]);
        setIsSaveHeaderOpen(false);
    };

    useEffect(() => cancel, [stage]);

    const handleOnUpdateValue = (item: ThemeCollection, newSortOrder: number | null) => {
        if (item.sortOrder === newSortOrder || !data) return;

        setIsSaveHeaderOpen(true);
        setItemsToUpdate(updateList({ item, newSortOrder, items: data, itemsToUpdate }).itemsToUpdate);
    };

    const handleOnChangeItemStatus = (item: ThemeCollection) =>
        dispatch(upsertCollectionsAction({ stage, items: [{ ...item, isActive: !item.isActive }] }));

    return (
        <Fragment>
            <SortableThemeCollectionList
                data={data}
                loading={info.loading}
                onUpdateValue={handleOnUpdateValue}
                onChangeItemStatus={handleOnChangeItemStatus}
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
    item: ThemeCollection;
    newSortOrder: number | null;
    items: ThemeCollection[];
    itemsToUpdate: ThemeCollection[];
}

export const updateList = ({
    item,
    newSortOrder,
    items,
    itemsToUpdate
}: UpdateListParams): { newItemList: ThemeCollection[]; itemsToUpdate: ThemeCollection[] } => {
    const newItem: ThemeCollection = { ...item, sortOrder: newSortOrder };
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

const mergeItems = (sourceItems: ThemeCollection[] | undefined, updatedItems: ThemeCollection[]) =>
    sourceItems?.map((sourceEntity) => {
        const updated = updatedItems.find((updatedValues) => sourceEntity.id === updatedValues.id);
        return updated ? { ...sourceEntity, ...updated } : sourceEntity;
    });

const sortItems = (items: ThemeCollection[]) =>
    items
        .sort((a, b) => b.id - a.id)
        .sort((a, b) => (a.sortOrder === null ? 1 : b.sortOrder === null ? -1 : a.sortOrder - b.sortOrder));

import { ExtendedEditableColumn } from "shared";

export const idColumn: ExtendedEditableColumn<{ id: number }> = {
    title: "ID",
    dataIndex: "id",
    width: 100,
    sorter: (a, b) => a.id - b.id
};

export const nameColumn: ExtendedEditableColumn<{ name: string }> = {
    title: "Name",
    dataIndex: "name",
    width: 300,
    editableCellProps: { type: "string" },
    sorter: (a, b) => a.name.localeCompare(b.name)
};

export const sortOrderColumn: ExtendedEditableColumn<{ sortOrder: number }> = {
    title: "Sort Order",
    dataIndex: "sortOrder",
    width: 100,
    editableCellProps: { type: "number" },
    sorter: (a, b) => a.sortOrder - b.sortOrder
};

export const sortingOrderColumn: ExtendedEditableColumn<{ sortingOrder: number }> = {
    title: "Sorting Order",
    dataIndex: "sortingOrder",
    width: 110,
    editableCellProps: { type: "number" },
    sorter: (a, b) => a.sortingOrder - b.sortingOrder
};

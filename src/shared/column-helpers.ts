export interface SortableColumnParams {
    key?: string;
    sorter: any;
    sortOrder?: "ascend" | "descend" | null;
}

export const createSortableColumnProps =
    <T extends string | undefined>(orderBy: T, sortDirection?: "asc" | "desc") =>
    (column: T): SortableColumnParams => {
        if (!column) return { sorter: false };

        return {
            key: column,
            sorter: true,
            sortOrder: column === orderBy ? (sortDirection === "asc" ? "ascend" : "descend") : undefined
        };
    };

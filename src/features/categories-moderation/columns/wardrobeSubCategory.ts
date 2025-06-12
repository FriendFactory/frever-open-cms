import { WardrobeSubCategory, ExtendedEditableColumn } from "shared";

export const wardrobeCategoryColumn: ExtendedEditableColumn<WardrobeSubCategory> = {
    title: "Wardrobe Category",
    dataIndex: "wardrobeCategoryId",
    extraDataName: "WardrobeCategory",
    width: 225,
    editableCellProps: { type: "select" },
    localSortByExtraData: true
};

import { UMAAdjustment, ExtendedEditableColumn } from "shared";

export interface NormalizedUMAAdjustment extends Omit<UMAAdjustment, "wardrobeSubCategoryAndUmaAdjustment"> {
    wardrobeSubCategoryAndUmaAdjustment: number[];
}

export const keyColumn: ExtendedEditableColumn<NormalizedUMAAdjustment> = {
    title: "Key",
    dataIndex: "key",
    width: 160,
    editableCellProps: { type: "string" }
};

export const wardrobeSubCategoryAndUmaAdjustmentColumn: ExtendedEditableColumn<NormalizedUMAAdjustment> = {
    title: "Wardrobe Sub Category",
    dataIndex: "wardrobeSubCategoryAndUmaAdjustment",
    extraDataName: "WardrobeSubCategory",
    width: 225,
    editableCellProps: { type: "select", mode: "multiple" }
};

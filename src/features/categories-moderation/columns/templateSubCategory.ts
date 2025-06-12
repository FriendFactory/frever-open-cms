import { TemplateSubCategory, ExtendedEditableColumn } from "shared";

export const templateCategoryColumn: ExtendedEditableColumn<TemplateSubCategory> = {
    title: "Template Category",
    dataIndex: "templateCategoryId",
    width: 225,
    extraDataName: "TemplateCategory",
    localSortByExtraData: true,
    editableCellProps: { type: "select" }
};

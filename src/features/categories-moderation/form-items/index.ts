import { FormItemProps } from "antd";

import { CategoryTypes } from "config";
import { ExtraDataName } from "shared";
import { editorSettingsPages } from "features/video-tasks/constants";
import { EditableCellFieldProps } from "shared/components/EditableTableV2/EditableCell";

const rules = [{ required: true }];

export interface CategoryFormItemType {
    itemProps: Omit<FormItemProps, "name"> & { name: string };
    inputProps: EditableCellFieldProps;
    extraDataName?: ExtraDataName;
}

const idItem: CategoryFormItemType = {
    itemProps: { name: "id", label: "ID", rules },
    inputProps: { type: "number" }
};

const nameItem: CategoryFormItemType = {
    itemProps: { name: "name", label: "Name", rules },
    inputProps: { type: "string" }
};

const labelItem: CategoryFormItemType = {
    itemProps: { name: "labelId", label: "Label", rules },
    inputProps: { type: "select" },
    extraDataName: "Label"
};

const levelItem: CategoryFormItemType = {
    itemProps: { name: "level", label: "Level", rules },
    inputProps: { type: "number" }
};

const xpRequiredItem: CategoryFormItemType = {
    itemProps: { name: "xpRequired", label: "Xp Required", rules },
    inputProps: { type: "number" }
};

const wardrobeCategoryItem: CategoryFormItemType = {
    itemProps: { name: "wardrobeCategoryId", label: "Category", rules },
    inputProps: { type: "select" },
    extraDataName: "WardrobeCategory"
};

const pagesItem: CategoryFormItemType = {
    itemProps: { name: "pages", label: "Pages", rules },
    inputProps: {
        type: "select",
        mode: "multiple",
        options: editorSettingsPages.map((el) => ({ label: el.name, value: el.id }))
    }
};

const templateCategoryItem: CategoryFormItemType = {
    itemProps: { name: "templateCategoryId", label: "Category", rules },
    inputProps: { type: "select" },
    extraDataName: "TemplateCategory"
};

const keyItem: CategoryFormItemType = {
    itemProps: { name: "key", label: "Key", rules },
    inputProps: { type: "string" }
};

const categoriesFormItemsMap: {
    [Key in CategoryTypes]?: CategoryFormItemType[];
} = {
    Genre: [nameItem, labelItem],
    PagesNavigation: [nameItem, pagesItem],
    Readiness: [idItem, nameItem],
    TemplateSubCategory: [nameItem, templateCategoryItem],
    UserLevel: [nameItem, levelItem, xpRequiredItem],
    WardrobeSubCategory: [nameItem, wardrobeCategoryItem],
    UMAAdjustment: [keyItem, nameItem]
};

export const getCategoriesFormItems = <T extends CategoryTypes>(categoryName: T): CategoryFormItemType[] =>
    categoriesFormItemsMap[categoryName] || [nameItem];

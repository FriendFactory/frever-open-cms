import { CategoryTypes } from "config";
import { ExtendedEditableColumn, ExtraDataType } from "shared";
import { idColumn, nameColumn, sortOrderColumn, sortingOrderColumn } from "./sharedColumns";
import { labelColumn, countriesColumn } from "./genre";
import { levelColumn, xpRequiredColumn } from "./userLevel";
import { wardrobeCategoryColumn } from "./wardrobeSubCategory";
import { templateCategoryColumn } from "./templateSubCategory";
import { descriptionColumn, pagesColumn } from "./pagesNavigation";
import {
    availableForMarketingColumn,
    displayNameColumn,
    enableMusicColumn,
    isoNameColumn,
    mobileNumberPrefixColumn
} from "./country";

const categoriesWithExtraColumns: {
    [Key in CategoryTypes]?: ExtendedEditableColumn<ExtraDataType<Key>>[];
} = {
    UserLevel: [idColumn, nameColumn, levelColumn, xpRequiredColumn],

    Genre: [idColumn, nameColumn, labelColumn, sortOrderColumn, countriesColumn],

    SetLocationCategory: [idColumn, nameColumn, sortOrderColumn],

    WardrobeCategory: [idColumn, nameColumn, sortOrderColumn],

    WardrobeSubCategory: [idColumn, nameColumn, wardrobeCategoryColumn, sortOrderColumn],

    BodyAnimationCategory: [idColumn, nameColumn, sortOrderColumn],

    VFXCategory: [idColumn, nameColumn, sortOrderColumn],

    CameraFilterCategory: [idColumn, nameColumn, sortOrderColumn],

    TemplateCategory: [idColumn, nameColumn, sortingOrderColumn],

    TemplateSubCategory: [idColumn, nameColumn, templateCategoryColumn, sortingOrderColumn],

    PagesNavigation: [idColumn, nameColumn, pagesColumn, descriptionColumn],

    Country: [
        idColumn,
        displayNameColumn,
        isoNameColumn,
        mobileNumberPrefixColumn,
        enableMusicColumn,
        availableForMarketingColumn
    ]
};

const baseCategoriesColumns = [idColumn, nameColumn];

export const getCategoriesColumns = <T extends CategoryTypes>(categoryName: T) =>
    categoriesWithExtraColumns[categoryName] || (baseCategoriesColumns as ExtendedEditableColumn<ExtraDataType<T>>[]);

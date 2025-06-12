import React from "react";

import { WardrobeAsset } from "features/search-assets/services";
import { ExtendedEditableColumn, useExtraDataBundle } from "shared";
import {
    assetTierCol,
    createdTimeCol,
    depublicationDateCol,
    groupIdCol,
    idCol,
    isStartPackMemberCol,
    modifiedTimeCol,
    nameCol,
    publicationDateCol,
    readinessCol,
    requiredLevelCol,
    uploaderUserIdCol
} from "./sharedColumns";

const wardrobeCategoryCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Category",
    width: 200,
    dataIndex: "wardrobeCategoryId",
    extraDataName: "WardrobeCategory",
    editableCellProps: { type: "select" }
};

const wardrobeSubCategoryCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Sub Category",
    width: 200,
    dataIndex: "wardrobeAndWardrobeSubCategory",
    render: (_, record) => <SubCategoryComponent wardrobe={record} />
};

const genderIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Gender",
    width: 140,
    dataIndex: "genderId",
    extraDataName: "Gender",
    editableCellProps: { type: "select", allowClear: true }
};

const compatibleGenderIdsCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Compatible Gender",
    width: 200,
    dataIndex: "compatibleGenderIds",
    extraDataName: "Gender",
    editableCellProps: {
        type: "select",
        allowClear: true,
        mode: "multiple",
        maxTagCount: "responsive"
    }
};

const wardrobeCollectionIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Collection",
    width: 200,
    dataIndex: "wardrobeCollectionId",
    extraDataName: "WardrobeCollection",
    editableCellProps: { type: "select", allowClear: true }
};

const wardrobeFitIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Fit",
    width: 200,
    dataIndex: "wardrobeFitId",
    extraDataName: "WardrobeFit",
    editableCellProps: { type: "select", allowClear: true }
};

const wardrobePatternIdsCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Pattern",
    width: 200,
    dataIndex: "wardrobePatternIds",
    extraDataName: "WardrobePattern",
    editableCellProps: { type: "select", allowClear: true, mode: "multiple", maxTagCount: "responsive" }
};

const wardrobeColorIdsCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Color",
    width: 200,
    dataIndex: "wardrobeColorIds",
    extraDataName: "WardrobeColor",
    editableCellProps: { type: "select", allowClear: true, mode: "multiple", maxTagCount: "responsive" }
};

const wardrobeStyleIdsCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Style",
    width: 200,
    dataIndex: "wardrobeStyleIds",
    extraDataName: "WardrobeStyle",
    editableCellProps: { type: "select", allowClear: true, mode: "multiple", maxTagCount: "responsive" }
};

const wardrobeMaterialIdsCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Material",
    width: 200,
    dataIndex: "wardrobeMaterialIds",
    extraDataName: "WardrobeMaterial",
    editableCellProps: { type: "select", allowClear: true, mode: "multiple", maxTagCount: "responsive" }
};

const brandIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Brand",
    width: 200,
    dataIndex: "brandId",
    extraDataName: "Brand",
    editableCellProps: { type: "select", allowClear: true }
};

const umaBundleIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Uma Bundle ID",
    width: 200,
    dataIndex: "umaBundleId",
    editableCellProps: { type: "number" }
};

const overridesLowerUnderwearCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Overrides Lower Underwear",
    width: 210,
    dataIndex: "overridesLowerUnderwear",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const overridesUpperUnderwearCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Overrides Upper Underwear",
    width: 210,
    dataIndex: "overridesUpperUnderwear",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const wardrobeGenderGroupIdCol: ExtendedEditableColumn<WardrobeAsset> = {
    title: "Wardrobe Gender Group ID",
    width: 200,
    dataIndex: "wardrobeGenderGroupId"
};

export const wardrobeColumns: ExtendedEditableColumn<WardrobeAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    assetTierCol,
    wardrobeColorIdsCol,
    wardrobePatternIdsCol,
    wardrobeStyleIdsCol,
    wardrobeMaterialIdsCol,
    wardrobeCategoryCol,
    wardrobeSubCategoryCol,
    brandIdCol,
    genderIdCol,
    compatibleGenderIdsCol,
    wardrobeCollectionIdCol,
    wardrobeGenderGroupIdCol,
    wardrobeFitIdCol,
    createdTimeCol,
    modifiedTimeCol,
    groupIdCol,
    umaBundleIdCol,
    uploaderUserIdCol,
    isStartPackMemberCol,
    overridesLowerUnderwearCol,
    overridesUpperUnderwearCol,
    publicationDateCol,
    depublicationDateCol,
    requiredLevelCol
];

interface SubCategoryComponentProps {
    wardrobe: WardrobeAsset;
}

const SubCategoryComponent = ({ wardrobe }: SubCategoryComponentProps) => {
    const bundle = useExtraDataBundle(["WardrobeSubCategory"]);
    return (
        <>
            {
                bundle?.bundle?.WardrobeSubCategory?.data?.find(
                    (el) =>
                        el.id ===
                        (wardrobe as WardrobeAsset)?.wardrobeAndWardrobeSubCategory?.[0]?.wardrobeSubCategoryId
                )?.name
            }
        </>
    );
};

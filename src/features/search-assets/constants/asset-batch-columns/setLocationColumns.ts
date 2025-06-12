import { SetLocationAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    assetTierCol,
    createdTimeCol,
    depublicationDateCol,
    groupIdCol,
    idCol,
    isDefaultCol,
    isStartPackMemberCol,
    modifiedTimeCol,
    nameCol,
    publicationDateCol,
    readinessCol,
    requiredLevelCol,
    uploaderUserIdCol
} from "./sharedColumns";

const allowPhotoCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Allow Photo",
    width: 200,
    dataIndex: "allowPhoto",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const allowVideoCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Allow Video",
    width: 200,
    dataIndex: "allowVideo",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const characterLocomotionAllowedCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Character Locomotion Allowed",
    width: 240,
    dataIndex: "characterLocomotionAllowed",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const vfxSpawnPositionIndexMaxCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "VFX Index Max",
    width: 200,
    dataIndex: "vfxSpawnPositionIndexMax",
    editableCellProps: { type: "number" }
};
const setLocationBundleIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Set LocationBundle ID",
    width: 200,
    dataIndex: "setLocationBundleId"
};

const setLocationCategoryIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Set Location Category",
    width: 200,
    dataIndex: "setLocationCategoryId",
    extraDataName: "SetLocationCategory",
    editableCellProps: { type: "select" }
};

const sortOrderByCategoryCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Sort Order By Category",
    width: 200,
    dataIndex: "sortOrderByCategory",
    editableCellProps: { type: "number" }
};

const setLocationMoodIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Set Location Mood",
    width: 200,
    dataIndex: "setLocationMoodId",
    extraDataName: "SetLocationMood",
    editableCellProps: { type: "select" }
};

const setLocationTemplateIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Set Location Template",
    width: 200,
    dataIndex: "setLocationTemplateId",
    extraDataName: "SetLocationTemplate",
    editableCellProps: { type: "select" }
};

const setLocationSubCategoryIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Set Location Sub Category",
    width: 200,
    dataIndex: "setLocationSubCategoryId",
    extraDataName: "SetLocationSubcategory",
    editableCellProps: { type: "select" }
};

const geoReferenceIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Geo Reference",
    width: 200,
    dataIndex: "geoReferenceId",
    extraDataName: "GeoReference",
    editableCellProps: { type: "select" }
};

const weatherIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "Weather",
    width: 200,
    dataIndex: "weatherId",
    extraDataName: "Weather",
    editableCellProps: { type: "select" }
};

const vfxTypeIdCol: ExtendedEditableColumn<SetLocationAsset> = {
    title: "VFX Type",
    width: 200,
    dataIndex: "vfxTypeId",
    extraDataName: "VFXType",
    editableCellProps: { type: "select" }
};

export const setLocationColumns: ExtendedEditableColumn<SetLocationAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    assetTierCol,
    setLocationCategoryIdCol,
    setLocationMoodIdCol,
    setLocationTemplateIdCol,
    geoReferenceIdCol,
    weatherIdCol,
    setLocationSubCategoryIdCol,
    vfxTypeIdCol,
    sortOrderByCategoryCol,
    groupIdCol,
    createdTimeCol,
    modifiedTimeCol,
    uploaderUserIdCol,
    vfxSpawnPositionIndexMaxCol,
    setLocationBundleIdCol,
    allowPhotoCol,
    allowVideoCol,
    characterLocomotionAllowedCol,
    isDefaultCol,
    isStartPackMemberCol,
    publicationDateCol,
    depublicationDateCol,
    requiredLevelCol
];

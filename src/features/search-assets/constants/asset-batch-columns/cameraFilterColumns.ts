import { CameraFilterAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
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
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const cameraFilterCategoryIdCol: ExtendedEditableColumn<CameraFilterAsset> = {
    title: "Camera Filter Category",
    width: 200,
    dataIndex: "cameraFilterCategoryId",
    extraDataName: "CameraFilterCategory",
    editableCellProps: { type: "select" }
};

const colorFilterCategoryIdCol: ExtendedEditableColumn<CameraFilterAsset> = {
    title: "Color Filter Category",
    width: 200,
    dataIndex: "colorFilterCategoryId",
    extraDataName: "ColorFilterCategory",
    editableCellProps: { type: "select" }
};

const cameraFilterSubCategoryIdCol: ExtendedEditableColumn<CameraFilterAsset> = {
    title: "Camera Filter SubCategory",
    width: 200,
    dataIndex: "cameraFilterSubCategoryId",
    extraDataName: "CameraFilterSubCategory",
    editableCellProps: { type: "select" }
};

export const cameraFilterColumns: ExtendedEditableColumn<CameraFilterAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    assetTierCol,
    cameraFilterCategoryIdCol,
    colorFilterCategoryIdCol,
    cameraFilterSubCategoryIdCol,
    uploaderUserIdCol,
    groupIdCol,
    sortOrderCol,
    isStartPackMemberCol,
    createdTimeCol,
    modifiedTimeCol,
    publicationDateCol,
    depublicationDateCol,
    requiredLevelCol
];

import { CameraAnimationTemplateAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    groupIdCol,
    idCol,
    isDefaultCol,
    readinessCol,
    sizeCol,
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const displayNameCol: ExtendedEditableColumn<CameraAnimationTemplateAsset> = {
    title: "Display Name",
    width: 220,
    dataIndex: "displayName",
    editableCellProps: { type: "string" }
};

const cameraAnimationTypeIdCol: ExtendedEditableColumn<CameraAnimationTemplateAsset> = {
    title: "Camera Animation Type",
    width: 220,
    dataIndex: "cameraAnimationTypeId",
    extraDataName: "CameraAnimationType",
    editableCellProps: { type: "select" }
};

const cameraAnimationIdCol: ExtendedEditableColumn<CameraAnimationTemplateAsset> = {
    title: "Camera Animation ID",
    width: 200,
    dataIndex: "cameraAnimationId"
};

const cameraCategoryIdCol: ExtendedEditableColumn<CameraAnimationTemplateAsset> = {
    title: "Camera Category",
    width: 200,
    dataIndex: "cameraCategoryId",
    extraDataName: "CameraCategory",
    editableCellProps: { type: "select" }
};

export const cameraAnimationColumns: ExtendedEditableColumn<CameraAnimationTemplateAsset>[] = [
    idCol,
    displayNameCol,
    readinessCol,
    cameraAnimationTypeIdCol,
    cameraCategoryIdCol,
    groupIdCol,
    sizeCol,
    uploaderUserIdCol,
    isDefaultCol,
    sortOrderCol,
    cameraAnimationIdCol
];

import { VFXAsset } from "features/search-assets/services";
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
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const vfxCategoryIdCol: ExtendedEditableColumn<VFXAsset> = {
    title: "VFX Category",
    width: 200,
    dataIndex: "vfxCategoryId",
    extraDataName: "VFXCategory",
    editableCellProps: { type: "select" }
};

const vfxTypeIdCol: ExtendedEditableColumn<VFXAsset> = {
    title: "VFX Type",
    width: 200,
    dataIndex: "vfxTypeId",
    extraDataName: "VFXType",
    editableCellProps: { type: "select" }
};

const vfxDirectionIdCol: ExtendedEditableColumn<VFXAsset> = {
    title: "VFX Direction",
    width: 200,
    dataIndex: "vfxDirectionId",
    extraDataName: "VFXDirection",
    editableCellProps: { type: "select" }
};

const vfxWorldSizeIdCol: ExtendedEditableColumn<VFXAsset> = {
    title: "VFX World Size",
    width: 200,
    dataIndex: "vfxWorldSizeId",
    extraDataName: "VFXWorldSize",
    editableCellProps: { type: "select" }
};

const loopingCol: ExtendedEditableColumn<VFXAsset> = {
    title: "Looping",
    width: 200,
    dataIndex: "looping",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const sizeKbCol: ExtendedEditableColumn<VFXAsset> = {
    title: "Size Kb",
    width: 200,
    dataIndex: "sizeKb",
    editableCellProps: { type: "number" }
};

export const vfxColumns: ExtendedEditableColumn<VFXAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    assetTierCol,
    vfxCategoryIdCol,
    vfxTypeIdCol,
    vfxDirectionIdCol,
    vfxWorldSizeIdCol,
    createdTimeCol,
    modifiedTimeCol,
    groupIdCol,
    sizeKbCol,
    loopingCol,
    isDefaultCol,
    isStartPackMemberCol,
    uploaderUserIdCol,
    sortOrderCol,
    publicationDateCol,
    depublicationDateCol,
    requiredLevelCol
];

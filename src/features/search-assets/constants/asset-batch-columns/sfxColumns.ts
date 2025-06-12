import { SFXAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    createdTimeCol,
    groupIdCol,
    idCol,
    modifiedTimeCol,
    nameCol,
    readinessCol,
    sizeCol,
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const sfxCategoryIdCol: ExtendedEditableColumn<SFXAsset> = {
    title: "SFX Category",
    width: 200,
    dataIndex: "sfxCategoryId",
    extraDataName: "SFXCategory",
    editableCellProps: { type: "select" }
};

const channelsCol: ExtendedEditableColumn<SFXAsset> = {
    title: "Channels",
    width: 200,
    dataIndex: "channels",
    editableCellProps: { type: "number" }
};

const samplingSizeCol: ExtendedEditableColumn<SFXAsset> = {
    title: "Sampling Size",
    width: 200,
    dataIndex: "samplingSize",
    editableCellProps: { type: "number" }
};

const durationCol: ExtendedEditableColumn<SFXAsset> = {
    title: "Duration",
    width: 200,
    dataIndex: "duration",
    editableCellProps: { type: "number" }
};

const samplingFrequencyCol: ExtendedEditableColumn<SFXAsset> = {
    title: "Sampling Frequency",
    width: 200,
    dataIndex: "samplingFrequency",
    editableCellProps: { type: "number" }
};

export const sfxColumns: ExtendedEditableColumn<SFXAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    groupIdCol,
    createdTimeCol,
    modifiedTimeCol,
    sizeCol,
    sfxCategoryIdCol,
    channelsCol,
    samplingSizeCol,
    durationCol,
    samplingFrequencyCol,
    uploaderUserIdCol,
    sortOrderCol
];

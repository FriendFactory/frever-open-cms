import { VoiceFilterAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    createdTimeCol,
    groupIdCol,
    idCol,
    modifiedTimeCol,
    nameCol,
    readinessCol,
    requiredLevelCol,
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const volumeCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Volume",
    width: 200,
    dataIndex: "volume",
    editableCellProps: { type: "number" }
};

const pitchCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Pitch",
    width: 200,
    dataIndex: "pitch",
    editableCellProps: { type: "number" }
};

const sendLevelCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Send Level",
    width: 200,
    dataIndex: "sendLevel",
    editableCellProps: { type: "number" }
};

const wetMixLevelCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Wet Mix Level",
    width: 200,
    dataIndex: "wetMixLevel",
    editableCellProps: { type: "number" }
};

const effectParametersCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Effect Parameters",
    width: 200,
    dataIndex: "effectParameters",
    editableCellProps: { type: "number" }
};

const voiceFilterCategoryIdCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Voice Filter Category",
    width: 200,
    dataIndex: "voiceFilterCategoryId",
    extraDataName: "VoiceFilterCategory",
    editableCellProps: { type: "select" }
};

const displayNameCol: ExtendedEditableColumn<VoiceFilterAsset> = {
    title: "Display Name",
    width: 240,
    dataIndex: "displayName",
    editableCellProps: { type: "string" }
};

export const voiceFilterColumns: ExtendedEditableColumn<VoiceFilterAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    displayNameCol,
    voiceFilterCategoryIdCol,
    volumeCol,
    pitchCol,
    sendLevelCol,
    wetMixLevelCol,
    effectParametersCol,
    groupIdCol,
    uploaderUserIdCol,
    sortOrderCol,
    createdTimeCol,
    modifiedTimeCol,
    requiredLevelCol
];

import { SongAsset } from "features/search-assets/services";
import { ExtendedEditableColumn } from "shared";
import {
    createdTimeCol,
    depublicationDateCol,
    groupIdCol,
    idCol,
    modifiedTimeCol,
    nameCol,
    publicationDateCol,
    readinessCol,
    sizeCol,
    sortOrderCol,
    uploaderUserIdCol
} from "./sharedColumns";

const genreIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "Genre",
    width: 200,
    dataIndex: "genreId",
    extraDataName: "Genre",
    editableCellProps: { type: "select" }
};

const artistIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "Artist",
    width: 200,
    dataIndex: "artistId",
    extraDataName: "Artist",
    editableCellProps: { type: "select" }
};

const labelIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "Label",
    width: 200,
    dataIndex: "labelId",
    extraDataName: "Label",
    editableCellProps: { type: "select" }
};

const channelsCol: ExtendedEditableColumn<SongAsset> = {
    title: "Channels",
    width: 200,
    dataIndex: "channels",
    editableCellProps: { type: "number" }
};

const samplingSizeCol: ExtendedEditableColumn<SongAsset> = {
    title: "Sampling Size",
    width: 200,
    dataIndex: "samplingSize",
    editableCellProps: { type: "number" }
};

const durationCol: ExtendedEditableColumn<SongAsset> = {
    title: "Duration",
    width: 200,
    dataIndex: "duration",
    editableCellProps: { type: "number" }
};

const samplingFrequencyCol: ExtendedEditableColumn<SongAsset> = {
    title: "Sampling Frequency",
    width: 200,
    dataIndex: "samplingFrequency",
    editableCellProps: { type: "number" }
};

const albumIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "Album",
    width: 200,
    dataIndex: "albumId",
    extraDataName: "Album",
    editableCellProps: { type: "select", allowClear: true }
};

const parentalExplicitCol: ExtendedEditableColumn<SongAsset> = {
    title: "Parental Explicit",
    width: 200,
    dataIndex: "parentalExplicit",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

const moodIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "Mood",
    width: 200,
    dataIndex: "moodId",
    extraDataName: "Mood",
    editableCellProps: { type: "select" }
};

const externalPartnerIdCol: ExtendedEditableColumn<SongAsset> = {
    title: "External Partner ID",
    width: 200,
    dataIndex: "externalPartnerId",
    editableCellProps: { type: "string" }
};

export const songColums: ExtendedEditableColumn<SongAsset>[] = [
    idCol,
    nameCol,
    readinessCol,
    genreIdCol,
    artistIdCol,
    labelIdCol,
    moodIdCol,
    albumIdCol,
    groupIdCol,
    createdTimeCol,
    modifiedTimeCol,
    sizeCol,
    channelsCol,
    samplingSizeCol,
    durationCol,
    samplingFrequencyCol,
    uploaderUserIdCol,
    sortOrderCol,
    parentalExplicitCol,
    externalPartnerIdCol,
    publicationDateCol,
    depublicationDateCol
];

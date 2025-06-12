import { Country, ExtendedEditableColumn } from "shared";

export const displayNameColumn: ExtendedEditableColumn<Country> = {
    title: "Name",
    dataIndex: "displayName",
    width: 150,
    sorter: (a, b) => a.displayName.localeCompare(b.displayName)
};

export const isoNameColumn: ExtendedEditableColumn<Country> = {
    title: "ISO Name",
    dataIndex: "isoName",
    width: 100,
    sorter: (a, b) => a.isoName.localeCompare(b.isoName)
};

export const mobileNumberPrefixColumn: ExtendedEditableColumn<Country> = {
    title: "Mobile Prefix",
    dataIndex: "mobileNumberPrefix",
    width: 100,
    sorter: (a, b) => a.mobileNumberPrefix.localeCompare(b.mobileNumberPrefix, undefined, { numeric: true })
};

export const enableMusicColumn: ExtendedEditableColumn<Country> = {
    title: "Enable Music",
    dataIndex: "enableMusic",
    editableCellProps: { type: "boolean" },
    render: (_, record) => (record.enableMusic ? "True" : "False"),
    width: 100
};

export const availableForMarketingColumn: ExtendedEditableColumn<Country> = {
    title: "Available For Marketing",
    dataIndex: "availableForMarketing",
    editableCellProps: { type: "boolean" },
    render: (_, record) => (record.availableForMarketing ? "True" : "False"),
    width: 100
};

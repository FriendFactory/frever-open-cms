import { ExtendedEditableColumn } from "shared";

export const idCol: ExtendedEditableColumn<{ id: number }> = {
    title: "ID",
    dataIndex: "id",
    width: 115
};

export const nameCol: ExtendedEditableColumn<{ name: string }> = {
    title: "Name",
    dataIndex: "name",
    width: 300,
    editableCellProps: { type: "string" }
};

export const groupIdCol: ExtendedEditableColumn<{ groupId: number }> = {
    title: "Group ID",
    width: 200,
    dataIndex: "groupId"
};

export const sizeCol: ExtendedEditableColumn<{ size: number | null }> = {
    title: "Size",
    width: 200,
    dataIndex: "size",
    editableCellProps: { type: "number" }
};

export const uploaderUserIdCol: ExtendedEditableColumn<{ uploaderUserId: number }> = {
    title: "Uploader User ID",
    width: 200,
    dataIndex: "uploaderUserId"
};

export const sortOrderCol: ExtendedEditableColumn<{ sortOrder: number }> = {
    title: "Sort Order",
    width: 200,
    dataIndex: "sortOrder",
    editableCellProps: { type: "number" }
};

export const requiredLevelCol: ExtendedEditableColumn<{ requiredLevel: number | null }> = {
    title: "Required Level",
    width: 200,
    dataIndex: "requiredLevel",
    extraDataName: "UserLevel",
    editableCellProps: { type: "select" }
};

export const isStartPackMemberCol: ExtendedEditableColumn<{ isStartPackMember: boolean }> = {
    title: "Is Start Pack Member",
    width: 200,
    dataIndex: "isStartPackMember",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

export const isDefaultCol: ExtendedEditableColumn<{ isDefault: boolean }> = {
    title: "Is Default",
    width: 200,
    dataIndex: "isDefault",
    editableCellProps: { type: "boolean" },
    isBoolean: true
};

export const readinessCol: ExtendedEditableColumn<{ readinessId: number }> = {
    width: 220,
    title: "Readiness",
    dataIndex: "readinessId",
    extraDataName: "Readiness",
    editableCellProps: { type: "select" }
};

export const assetTierCol: ExtendedEditableColumn<{ assetTierId: number | null }> = {
    title: "Asset Tier",
    width: 200,
    dataIndex: "assetTierId",
    extraDataName: "AssetTier",
    editableCellProps: { type: "select" }
};

export const createdTimeCol: ExtendedEditableColumn<{ createdTime: string }> = {
    title: "Created Time",
    width: 220,
    dataIndex: "createdTime",
    isDate: true
};

export const modifiedTimeCol: ExtendedEditableColumn<{ modifiedTime: string }> = {
    title: "Modified Time",
    width: 220,
    dataIndex: "modifiedTime",
    isDate: true
};

export const publicationDateCol: ExtendedEditableColumn<{ publicationDate: string | null }> = {
    title: "Publication Date",
    width: 200,
    dataIndex: "publicationDate",
    editableCellProps: { type: "date", showTime: { format: "HH:mm" }, format: "YYYY-MM-DD HH:mm" },
    isDate: true
};

export const depublicationDateCol: ExtendedEditableColumn<{ depublicationDate: string | null }> = {
    title: "Depublication Date",
    width: 200,
    dataIndex: "depublicationDate",
    editableCellProps: { type: "date", showTime: { format: "HH:mm" }, format: "YYYY-MM-DD HH:mm" },
    isDate: true
};

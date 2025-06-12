import { UserLevel, ExtendedEditableColumn } from "shared";

export const levelColumn: ExtendedEditableColumn<UserLevel> = {
    title: "Level",
    dataIndex: "level",
    width: 150,
    editableCellProps: { type: "number" },
    sorter: (a, b) => a.level - b.level
};

export const xpRequiredColumn: ExtendedEditableColumn<UserLevel> = {
    title: "Xp Required",
    dataIndex: "xpRequired",
    width: 150,
    editableCellProps: { type: "number" },
    sorter: (a, b) => a.xpRequired - b.xpRequired
};

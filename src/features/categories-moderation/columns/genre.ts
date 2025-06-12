import { ExtendedEditableColumn, Genre } from "shared";

export const labelColumn: ExtendedEditableColumn<Genre> = {
    title: "Label",
    dataIndex: "labelId",
    width: 200,
    extraDataName: "Label",
    editableCellProps: { type: "select" },
    localSortByExtraData: true
};

export const countriesColumn: ExtendedEditableColumn<Genre> = {
    title: "Countries",
    dataIndex: "countries",
    width: 300,
    extraDataName: "Country",
    editableCellProps: {
        type: "select",
        mode: "multiple",
        allowClear: true,
        filterOption: (input, option) => (option?.label as string)?.toLowerCase().includes(input.toLowerCase()),
        filterSort: (optionA, optionB) => (optionA.label as string).localeCompare(optionB.label as string)
    }
};

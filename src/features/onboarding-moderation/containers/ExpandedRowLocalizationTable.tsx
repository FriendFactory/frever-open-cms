import React from "react";
import lodash from "lodash";
import styled from "styled-components";

import { EditableTable, EditableTableColumn } from "shared";
import {
    AVAILABLE_LANGUAGES,
    LOCALIZATION_FIELDS,
    ISOCodes,
    LocalizationType,
    OnboardingQuest,
    OnboardingQuestGroup
} from "../services";

export interface ExpandedRowDataType extends LocalizationType {
    id: number;
    fieldName: typeof LOCALIZATION_FIELDS[number];
}

export interface ExpandedRowLocalizationTableProps<T = OnboardingQuestGroup | OnboardingQuest> {
    data: T;
    onFinish: (data: ExpandedRowDataType, sourceValue: ExpandedRowDataType) => void;
}

export function ExpandedRowLocalizationTable({ data, onFinish }: ExpandedRowLocalizationTableProps) {
    const dataSource: ExpandedRowDataType[] = LOCALIZATION_FIELDS.map((fieldName, index) => ({
        id: index + 1,
        fieldName: fieldName,
        ...data[fieldName]
    }));

    const languageColumns: EditableTableColumn<ExpandedRowDataType>[] = Object.keys(AVAILABLE_LANGUAGES).map(
        (isoCode) => ({
            title: AVAILABLE_LANGUAGES[isoCode as ISOCodes],
            dataIndex: isoCode,
            editableCellProps: { type: "textarea" },
            width: 250
        })
    );

    const columns: EditableTableColumn<ExpandedRowDataType>[] = [
        {
            title: "Name",
            dataIndex: "fieldName",
            render: (_, record) => lodash.startCase(record.fieldName),
            width: 150
        },
        ...languageColumns
    ];

    return (
        <EditableTable columns={columns} dataSource={dataSource} pagination={false} rowKey="id" onFinish={onFinish} />
    );
}

export const RowExpandedWrapper = styled("div")`
    .ant-table-title {
        padding-top: 1px;
        padding-bottom: 1px;
    }
    .ant-table-expanded-row-fixed {
        overflow: unset !important;
        padding-right: 0 !important;
        padding-left: 0 !important;
    }
    .ant-table-expanded-row-fixed .ant-table {
        margin-inline: 32px 0px !important;
    }
`;

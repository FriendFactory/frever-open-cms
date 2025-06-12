import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";

import { CreateLocalizationModalContainer } from "./CreateLocalizationModalContainer";
import { SelectActionDropdownContainer } from "./SelectActionDropdownContainer";
import { availableLanguages, ISOCodes, Localization } from "../services/api";
import { localizationListSelector } from "../store/reducer/localizationListReducer";
import { LocalizationQueryParams } from "../services";
import { localizationDeleteAction, localizationPostAction } from "../store";
import { actionColumnRender, ActionColumnRenderProps, EditableTable, EditableTableColumn } from "shared";

interface LocalizationListContainer {
    stage: string;
    params?: LocalizationQueryParams;
}

export type LocalizationWithId = Localization & { id: string };

export const LocalizationListContainer = ({ stage, params }: LocalizationListContainer) => {
    const dispatch = useDispatch();
    const info = useSelector(localizationListSelector(stage, params || {}));

    const onFinish = (newValue: LocalizationWithId, sourceValue: LocalizationWithId) => {
        const { id, ...data } = { ...sourceValue, ...newValue };

        const cleanValue = cleanLocalizationValue(data.values);
        const result = { ...data, values: cleanValue };

        dispatch(localizationPostAction({ stage, postType: "update", data: result as Localization }));
    };

    const onDelete = (key: string) => () => dispatch(localizationDeleteAction({ stage, key }));

    const columns: EditableTableColumn<LocalizationWithId>[] = [
        {
            title: "Key",
            dataIndex: "key",
            width: 300,
            fixed: "left"
        },
        {
            title: "Type",
            dataIndex: "type",
            editableCellProps: { type: "textarea" },
            width: 150
        },
        {
            title: "Description",
            dataIndex: "description",
            editableCellProps: { type: "textarea" },
            width: 250
        },
        ...languageColumns
    ];

    const actionColumns = {
        title: (
            <Space>
                <CreateLocalizationModalContainer />
                <SelectActionDropdownContainer stage={stage}>
                    <Button icon={<MoreOutlined />} />
                </SelectActionDropdownContainer>
            </Space>
        ),
        render: (props: ActionColumnRenderProps<LocalizationWithId>) =>
            actionColumnRender({
                ...props,
                extra: (record) => (
                    <Popconfirm
                        title="Delete localization key"
                        description="Are you sure to delete this localization key?"
                        onConfirm={onDelete(record.key)}
                        okText="Confirm"
                        okType="danger"
                        cancelText="Cancel">
                        <Button danger ghost icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                )
            })
    };

    const tableWidth = columns.reduce((acc, el) => acc + +(el.width ?? 100), 0);

    const dataSource = addIdsToLocalization(info.data);

    return (
        <EditableTable
            loading={info.loading}
            columns={columns}
            onFinish={onFinish}
            dataSource={dataSource}
            scroll={{ x: tableWidth, y: "100vh - 264px" }}
            pagination={false}
            rowSelection={undefined}
            actionColumnProps={actionColumns}
        />
    );
};

const cleanLocalizationValue = (value: Localization["values"]) =>
    Object.fromEntries(Object.entries(value).filter(([_, text]) => Boolean(text)));

const addIdsToLocalization = (localization?: Localization[]) =>
    localization?.map((val) => ({
        ...val,
        id: val.key
    }));

export const languageColumns: EditableTableColumn<LocalizationWithId>[] = Object.keys(availableLanguages).map(
    (isoCode) => ({
        title: availableLanguages[isoCode as ISOCodes],
        dataIndex: ["values", isoCode],
        editableCellProps: { type: "textarea" },
        width: 250
    })
);

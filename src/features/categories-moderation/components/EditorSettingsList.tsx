import React from "react";
import { Table } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

import { CommonExtraDataType, EditorSettings } from "shared/services/api";
import { DeleteButtonContainer } from "../containers/EditorSettings/DeleteButtonContainer";
import { CreateEditorSettingsContainer } from "../containers/CreateEditorSettingsContainer";

export interface EditorSettingsListProps {
    stage: string;
    data?: EditorSettings[];
    loading: boolean;
    handleOnRow?: (record: EditorSettings) => { onClick: () => void };
}

export function EditorSettingsList({ stage, data, loading, handleOnRow }: EditorSettingsListProps) {
    const columns: ColumnsType<EditorSettings> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            sorter: (a, b) => a.id - b.id
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 225,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: <CreateEditorSettingsContainer stage={stage} />,
            width: 125,
            align: "right" as "right",
            render: (_: unknown, value: CommonExtraDataType) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <DeleteButtonContainer
                        stage={stage}
                        id={value.id}
                        icon={<MinusOutlined />}
                        type="primary"
                        ghost
                        danger
                    />
                </div>
            )
        }
    ];

    return (
        <Table
            rowKey="id"
            loading={loading}
            dataSource={data}
            onRow={handleOnRow}
            pagination={false}
            scroll={{ x: 260 }}
            columns={columns}
        />
    );
}

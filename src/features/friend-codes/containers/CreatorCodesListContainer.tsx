import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ActionColumnProps, EditableTable, EditableTableColumn, actionColumnRender } from "shared";
import { CreatorCodesQueryParams, StarCreatorCode } from "../services";
import { creatorCodesListPageSelector } from "../store/selectors/creatorCodesListPage";
import { changeCreatorCodeStatusAction, creatorCodeUpsertAction } from "../store/actions/creatorCodes";
import { Badge, Button, Tooltip } from "antd";
import { StopOutlined, UndoOutlined } from "@ant-design/icons";

export interface CreatorCodesListContainerProps {
    stage: string;
    params: CreatorCodesQueryParams;
    extra: React.ReactNode;
    renderUserThumbnail: (user: StarCreatorCode) => React.ReactNode;
}

export function CreatorCodesListContainer({
    stage,
    params,
    extra,
    renderUserThumbnail
}: CreatorCodesListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(creatorCodesListPageSelector(stage, params));

    const columns: EditableTableColumn<StarCreatorCode>[] = [
        {
            title: "Profile",
            dataIndex: "groupId",
            render: (_, record) => renderUserThumbnail(record),
            width: 200
        },
        {
            title: "Code",
            dataIndex: "code",
            editableCellProps: { type: "text", maxLength: 16, showCount: true },
            width: 80
        },
        {
            title: "Status",
            width: 100,
            align: "right",
            render: (_, record) =>
                record.isEnabled ? <Badge color="blue" text="Active" /> : <Badge color="red" text="Inactive" />
        }
    ];

    const handleOnChangeStatus = (data: StarCreatorCode) => dispatch(changeCreatorCodeStatusAction({ stage, data }));

    const handleOnFinish = (data: StarCreatorCode, sourceValue: StarCreatorCode) =>
        dispatch(creatorCodeUpsertAction({ stage, data: { ...sourceValue, ...data } }));

    const actionColumn: ActionColumnProps<StarCreatorCode> = {
        title: extra,
        render: (props) =>
            actionColumnRender({
                ...props,
                extra: (item: StarCreatorCode) => (
                    <Tooltip title={item.isEnabled ? "Set Inactive" : "Set Active"}>
                        <Button
                            type="primary"
                            ghost
                            danger={item.isEnabled}
                            icon={item.isEnabled ? <StopOutlined /> : <UndoOutlined />}
                            onClick={() => handleOnChangeStatus(item)}
                        />
                    </Tooltip>
                )
            })
    };

    return (
        <EditableTable
            loading={info.loading}
            columns={columns}
            dataSource={info.data}
            onFinish={handleOnFinish}
            actionColumnProps={actionColumn}
        />
    );
}

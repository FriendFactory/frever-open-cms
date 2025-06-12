import React, { useCallback } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { CREATOR_CANDIDATE_LIST_URL } from "urls";
import { creatorCandidateListPageSelector } from "../store/reducer";
import { StarCreatorCandidate } from "../services";
import { CreatorCandidateFormContainer } from "./CreatorCandidateFormContainer";
import { executeCreatorCandidateCommandAction } from "../store/actions";
import { actionColumnRender, ActionColumnRenderProps, EditableTable, EditableTableColumn } from "shared";

export function CreatorCandidateListContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = CREATOR_CANDIDATE_LIST_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const info = useSelector(creatorCandidateListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const handleOnFinish = useCallback(
        (data: Partial<StarCreatorCandidate>) => {
            data.id
                ? dispatch(
                      executeCreatorCandidateCommandAction({
                          stage: urlMatch.params.stage,
                          command: { type: "update", entityId: data.id, data }
                      })
                  )
                : message.error("ID is required");
        },
        [urlMatch.params.stage]
    );
    const handleOnClickDeleteButton = useCallback(
        (entityId: number) => () => {
            dispatch(
                executeCreatorCandidateCommandAction({
                    stage: urlMatch.params.stage,
                    command: { type: "delete", entityId }
                })
            );
        },
        [urlMatch.params.stage]
    );

    const columns: EditableTableColumn<StarCreatorCandidate>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 200,
            editableCellProps: { type: "string" }
        },
        {
            title: "Created",
            render: (_, record) => dayjs.utc(record.createdTime).format("DD MMM YYYY  HH:mm:ss"),
            width: 150
        },
        {
            title: "Modified",
            render: (_, record) => dayjs.utc(record.modifiedTime).format("DD MMM YYYY  HH:mm:ss"),
            width: 150
        }
    ];

    const actionColumn = {
        title: <CreatorCandidateFormContainer />,
        render: (props: ActionColumnRenderProps<StarCreatorCandidate>) =>
            actionColumnRender({
                ...props,
                extra: (item) => (
                    <Popconfirm
                        title="Are you sure to remove this star creator candidate?"
                        onConfirm={handleOnClickDeleteButton(item.id)}
                        okText="Confirm"
                        okType="danger"
                        cancelText="Cancel">
                        <Button ghost danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                )
            })
    };

    return (
        <EditableTable
            dataSource={info.data}
            columns={columns}
            loading={info.loading && !info.data}
            onFinish={handleOnFinish}
            pagination={false}
            actionColumnProps={actionColumn}
            scroll={{ x: 665 }}
        />
    );
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, Button, Popconfirm, Result, Space, Tooltip } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, FormOutlined, MinusOutlined } from "@ant-design/icons";

import { EditableTable, ActionColumnRenderProps, EditableTableColumn, useCurrentStage } from "shared";
import { AppState } from "app-state";
import { BotComment } from "../services";
import { deleteBotCommentAction, updateBotCommentsAction, upsertBotCommentAction } from "../store/actions";
import { NormalizedBot } from "../store/reducer/bot";
import { CreateBotCommentContainer } from "./CreateBotCommentContainer";

export interface BotCommentsContainerProps {
    selectorFactory: (appState: AppState) => {
        loading: boolean;
        error?: string;
        data?: BotComment[];
        bot?: NormalizedBot;
    };
}

export function BotCommentsContainer({ selectorFactory }: BotCommentsContainerProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const info = useSelector(selectorFactory);

    if (info.error) return <Result status="error" title={info.error} />;

    const handleOnUpdateComment = (data: BotComment, sourceValue?: BotComment) =>
        dispatch(upsertBotCommentAction({ stage, data: { ...sourceValue, ...data } }));

    const handleOnDeleteComment = (botCommentId: number) => {
        dispatch(deleteBotCommentAction({ stage, botCommentId }));
    };

    const handleOnRemoveFromBot = (botCommentId: number) => {
        if (info.bot?.comments) {
            const comments = info.bot.comments?.filter((el) => el !== botCommentId);
            dispatch(updateBotCommentsAction({ stage, botId: info.bot.id, comments }));
        }
    };

    const columns: EditableTableColumn<BotComment>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 150
        },
        {
            title: "Text",
            dataIndex: "commentText",
            editableCellProps: { type: "textarea" },
            width: 500
        },
        {
            title: "Is Enabled",
            align: "right",
            width: 150,
            dataIndex: "isEnabled",
            editableCellProps: { type: "checkbox" },
            render: (_, record) => (
                <Badge color={record.isEnabled ? "blue" : "red"} text={record.isEnabled ? "Enabled" : "Disabled"} />
            )
        }
    ];

    const actionColumnsProps = {
        title: <CreateBotCommentContainer />,
        fixed: false,
        width: 136,
        render: ({ isEditing, item, onCancel, onEdit, onSave }: ActionColumnRenderProps<BotComment>) => {
            return (
                <Space size="small">
                    {isEditing ? (
                        <>
                            <Button type="primary" ghost onClick={() => onSave(item.id)} icon={<CheckOutlined />} />
                            <Button type="primary" ghost danger onClick={onCancel} icon={<CloseOutlined />} />
                        </>
                    ) : (
                        <>
                            <Popconfirm
                                title="Warning"
                                description="This change will affect all bots using this comment."
                                onConfirm={() => onEdit(item)}
                                okText="Continue"
                                okButtonProps={{ type: "primary", ghost: true }}
                                cancelText="Cancel">
                                <Button icon={<FormOutlined />} />
                            </Popconfirm>
                            <Space size="small">
                                <Popconfirm
                                    title="Warning: Permanent Comment Deletion"
                                    description="This change will affect all bots using this comment. This cannot be undone."
                                    onConfirm={() => handleOnDeleteComment(item.id)}
                                    okText="Confirm"
                                    okButtonProps={{ type: "primary", ghost: true, danger: true }}
                                    cancelText="Cancel">
                                    <Tooltip title="Delete comment completely">
                                        <Button danger icon={<DeleteOutlined />} />
                                    </Tooltip>
                                </Popconfirm>
                                {info.bot && (
                                    <Tooltip title="Remove comment from bot">
                                        <Button
                                            danger
                                            icon={<MinusOutlined />}
                                            onClick={() => handleOnRemoveFromBot(item.id)}
                                        />
                                    </Tooltip>
                                )}
                            </Space>
                        </>
                    )}
                </Space>
            );
        }
    };

    return (
        <EditableTable
            dataSource={info.data}
            loading={info.loading}
            columns={columns}
            pagination={false}
            scroll={{ x: 600 }}
            onFinish={handleOnUpdateComment}
            actionColumnProps={actionColumnsProps}
        />
    );
}

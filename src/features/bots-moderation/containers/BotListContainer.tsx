import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Badge, Button, Popconfirm, Result, Tag, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { Bot } from "../services";
import { NormalizedBot, botListPageSelector } from "../store/reducer/bot";
import { BOT_DETAILS_PAGE_URL, BOT_LIST_PAGE_URL, USER_DETAILS_INFO_URL } from "urls";
import { ProtectedLink, EditableTable, EditableTableColumn, actionColumnRender, ActionColumnRenderProps } from "shared";
import { knownBotActivitieTypes } from "../constants";
import { User } from "features/user-moderation/services";
import { deleteBotAction, upsertBotAction } from "../store/actions";

export type UserSearchWindowType = (btnText: string, onUserClick: (user: User) => void) => React.ReactNode;

export interface BotListContainerProps {
    createBotComponent: JSX.Element;
    renderUserThumbnail: (bot: Bot | NormalizedBot) => React.ReactNode;
}

export function BotListContainer({ createBotComponent, renderUserThumbnail }: BotListContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = BOT_LIST_PAGE_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;
    const stage = urlMatch.params.stage;

    const info = useSelector(botListPageSelector(stage, urlMatch.query || {}));

    if (info.error) return <Result status="error" title={info.error} />;

    const handleOnFinish = (
        updatedValue: Pick<Bot, "allowedActivityTypes" | "isEnabled" | "runInSimulationMode">,
        sourceValue: Bot | NormalizedBot
    ) => {
        const data = { ...sourceValue, ...updatedValue };
        dispatch(upsertBotAction({ stage, data }));
    };

    const handleOnDeleteBot = (botId: number) => () => {
        dispatch(deleteBotAction({ stage, botId }));
    };

    const columns = getColumns(stage, renderUserThumbnail);

    const handleOnRow = (record: Bot | NormalizedBot) => ({
        onClick: () => history.push(BOT_DETAILS_PAGE_URL.format({ stage, id: record.id }))
    });

    const actionColumn = {
        title: createBotComponent,
        render: (props: ActionColumnRenderProps<Bot>) =>
            actionColumnRender({
                ...props,
                extra: (item) => (
                    <div onClick={stopPropagation}>
                        <Popconfirm
                            title="Warning: Permanent Bot Deletion"
                            description="This action will completely delete the bot."
                            onConfirm={handleOnDeleteBot(item.id)}
                            okText="Confirm"
                            okButtonProps={{ type: "primary", ghost: true, danger: true }}
                            cancelText="Cancel">
                            <Tooltip title="Delete comment completely">
                                <Button danger icon={<DeleteOutlined />} />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                )
            })
    };

    return (
        <EditableTable
            loading={!info.data && info.loading}
            dataSource={info.data as Bot[]}
            columns={columns}
            rowKey={getRowKey}
            onRow={handleOnRow}
            pagination={false}
            scroll={{ x: 600 }}
            onFinish={handleOnFinish}
            actionColumnProps={actionColumn}
        />
    );
}

const getRowKey = (el: Bot | NormalizedBot) => el.id;

const options = knownBotActivitieTypes.map((el) => ({ label: el.name, value: el.id }));

const getColumns = (
    stage: string,
    renderUserThumbnail: (bot: Bot | NormalizedBot) => React.ReactNode
): EditableTableColumn<Bot | NormalizedBot>[] => [
    {
        title: "ID",
        dataIndex: "id",
        width: 100
    },
    {
        title: "Profile",
        render: (_, record) => (
            <ProtectedLink
                onClick={(e) => e.stopPropagation()}
                feature="Social"
                to={USER_DETAILS_INFO_URL.format({
                    stage,
                    selector: "mainGroupId",
                    id: record.groupId
                })}>
                {renderUserThumbnail(record)}
            </ProtectedLink>
        ),
        width: 100
    },
    {
        title: "Allowed Activity Types",
        dataIndex: "allowedActivityTypes",
        editableCellProps: { allowClear: true, mode: "multiple", options },
        width: 200,
        render: (_, record) =>
            record.allowedActivityTypes.map((el) => (
                <Tag>{knownBotActivitieTypes.find((type) => type.id === el)?.name}</Tag>
            ))
    },
    {
        title: "Run In Simulation Mode",
        dataIndex: "runInSimulationMode",
        align: "center",
        width: 150,
        editableCellProps: { type: "checkbox" },
        render: (_, record) => (record.runInSimulationMode ? "Yes" : "No")
    },
    {
        title: "Is Enabled",
        dataIndex: "isEnabled",
        editableCellProps: { type: "checkbox" },
        width: 150,
        render: (_, record) => (
            <Badge color={record.isEnabled ? "blue" : "red"} text={record.isEnabled ? "Enabled" : "Disabled"} />
        )
    }
];

const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation();

import React from "react";
import { Divider, Input, List, Space, Tooltip } from "antd";
import ReactDragListView from "react-drag-listview";
import { DeleteTwoTone, UsergroupAddOutlined, VideoCameraAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { SortOrderTypes, Template } from "features/video-templates/services";
import { TaskVideoCard } from "features/video-tasks/components/TaskVideoCard";
import { ProtectedLink, createCdnURLFromFiles, useCurrentStage } from "shared";
import { EVENT_DETAILS_PAGE_URL } from "urls";

export interface SortingOrderTemplateListProps {
    data: Template[];
    loading: boolean;
    sortOrderType: SortOrderTypes;
    updateTemplSortingValue: (template: Template, newSortOrder: number | null) => void;
}

export function SortingOrderTemplateList({
    data,
    loading,
    sortOrderType,
    updateTemplSortingValue
}: SortingOrderTemplateListProps) {
    const stage = useCurrentStage();

    const onValueChange =
        (templ: Template) => (event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) =>
            updateTemplSortingValue(templ, event.currentTarget.value ? Number(event.currentTarget.value) : null);

    const handleOnDragEnd = (from: number, to: number) => {
        const fromItem = data[from];
        const toItem = data[to];
        updateTemplSortingValue(fromItem, toItem[sortOrderType]);
    };

    return (
        <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
            <List
                loading={loading}
                dataSource={data}
                rowKey={getRowKey}
                pagination={false}
                itemLayout="vertical"
                renderItem={(item) => (
                    <List.Item
                        className="draggble"
                        actions={renderActions(item)}
                        extra={
                            <Space size="middle">
                                {sortOrderNames[sortOrderType]}
                                <Input
                                    type="number"
                                    key={item[sortOrderType]}
                                    defaultValue={item[sortOrderType] ?? undefined}
                                    onPressEnter={onValueChange(item)}
                                    onBlur={onValueChange(item)}
                                />
                            </Space>
                        }>
                        <List.Item.Meta
                            avatar={
                                <TaskVideoCard
                                    width={80}
                                    height={100}
                                    thumbnailUrl={createCdnURLFromFiles({
                                        stage,
                                        entityType: "template",
                                        id: item.id,
                                        files: item.files,
                                        resolution: "512x512"
                                    })}
                                />
                            }
                            title={item.title}
                            description={
                                <Space wrap split={<Divider type="vertical" />}>
                                    <span>Created: {dayjs.utc(item.createdTime).format("DD-MM-YYYY")}</span>
                                    <span>Modified: {dayjs.utc(item.modifiedTime).format("DD-MM-YYYY")}</span>
                                    <span>
                                        Event:&nbsp;
                                        <ProtectedLink
                                            target="_blank"
                                            feature="Social"
                                            to={EVENT_DETAILS_PAGE_URL.format({ stage, id: item.eventId })}>
                                            {item.eventId}
                                        </ProtectedLink>
                                    </span>
                                </Space>
                            }
                        />
                    </List.Item>
                )}
            />
        </ReactDragListView>
    );
}

const getRowKey = (row: Template) => row.id;

const renderActions = (item: Template) => {
    const actions = [
        <Tooltip title="Usage count">
            <Space>
                <VideoCameraAddOutlined />
                {item.usageCount}
            </Space>
        </Tooltip>,
        <Tooltip title="Character count">
            <Space>
                <UsergroupAddOutlined />
                {item.characterCount}
            </Space>
        </Tooltip>
    ];

    if (item.isDeleted) {
        actions.push(
            <Space>
                <DeleteTwoTone twoToneColor="red" />
                Deleted
            </Space>
        );
    }

    return actions;
};

const sortOrderNames = {
    trendingSortingOrder: "Trending",
    categorySortingOrder: "Category",
    onBoardingSortingOrder: "On Boarding",
    challengeSortOrder: "Challenge"
} as const;

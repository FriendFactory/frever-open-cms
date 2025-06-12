import React from "react";
import { Button, List, Popconfirm, Space } from "antd";
import ReactDragListView from "react-drag-listview";
import { StopOutlined, UndoOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { ThemeCollection } from "../services";
import { ThemeCollectionOrderField } from "./ThemeCollectionOrderField";
import { ThemeCollectionListItemMeta } from "./ThemeCollectionListItemMeta";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface SortableThemeCollectionListProps {
    loading: boolean;
    data?: ThemeCollection[];
    onUpdateValue: (item: ThemeCollection, newSortOrder: number | null) => void;
    onChangeItemStatus: (item: ThemeCollection) => void;
}

export function SortableThemeCollectionList({
    data,
    loading,
    onUpdateValue,
    onChangeItemStatus
}: SortableThemeCollectionListProps) {
    const stage = useCurrentStage();

    const handleOnDragEnd = (from: number, to: number) => {
        if (data) {
            const fromItem = data[from];
            const toItem = data[to];
            onUpdateValue(fromItem, toItem.sortOrder);
        }
    };

    return (
        <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
            <List
                rowKey="id"
                itemLayout="horizontal"
                pagination={false}
                loading={loading}
                dataSource={data}
                renderItem={(item) => {
                    return (
                        <List.Item
                            key={item.id}
                            className="draggble"
                            extra={
                                <Space size="small">
                                    <ReadinessTag stage={stage} readinessId={item.readinessId} />
                                    <ThemeCollectionOrderField
                                        label="Order"
                                        defaultValue={item.sortOrder}
                                        onEditFinish={(value) => onUpdateValue(item, value)}
                                    />
                                    <Popconfirm
                                        title={`Make item ${item.isActive ? "inactive" : "active"}?`}
                                        okText="Confirm"
                                        okType={item.isActive ? "danger" : "primary"}
                                        onConfirm={() => onChangeItemStatus(item)}
                                        placement="leftTop">
                                        <Button
                                            type="primary"
                                            ghost
                                            danger={item.isActive}
                                            icon={item.isActive ? <StopOutlined /> : <UndoOutlined />}
                                        />
                                    </Popconfirm>
                                </Space>
                            }>
                            <ThemeCollectionListItemMeta item={item} avatarSize={80} stage={stage} />
                        </List.Item>
                    );
                }}
            />
        </ReactDragListView>
    );
}

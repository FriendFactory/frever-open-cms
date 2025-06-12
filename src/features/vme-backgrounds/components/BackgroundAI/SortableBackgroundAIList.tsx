import React from "react";
import { Button, Checkbox, List, ListProps, Space } from "antd";
import ReactDragListView from "react-drag-listview";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { VMEBackgroundOrderField } from "../VMEBackgroundOrderField";
import { BackgroundAIListItemMeta } from "./BackgroundAIListItemMeta";

export interface SortableBackgroundAIListProps extends ListProps<BackgroundAI> {
    onUpdateValue: (item: BackgroundAI, newSortOrder: number | null) => void;
    onDelete: (item: BackgroundAI) => void;
    selectedItems: BackgroundAI[];
    handleSelected: (item: BackgroundAI) => void;
}

export function SortableBackgroundAIList({
    dataSource,
    loading,
    selectedItems,
    handleSelected,
    onUpdateValue,
    onDelete,
    ...props
}: SortableBackgroundAIListProps) {
    const stage = useCurrentStage();

    const handleOnDragEnd = (from: number, to: number) => {
        if (dataSource) {
            const fromItem = dataSource[from];
            const toItem = dataSource[to];
            onUpdateValue(fromItem, toItem.sortOrder);
        }
    };

    return (
        <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
            <List
                {...props}
                rowKey="id"
                itemLayout="horizontal"
                pagination={false}
                loading={loading}
                dataSource={dataSource}
                renderItem={(item) => {
                    return (
                        <List.Item key={item.id} className="draggble">
                            <BackgroundAIListItemMeta item={item} avatarSize={80} stage={stage} />
                            <Space size="large" align="center">
                                <VMEBackgroundOrderField
                                    label="Order"
                                    defaultValue={item.sortOrder}
                                    onEditFinish={(value) => onUpdateValue(item, value)}
                                />

                                <Button
                                    type="primary"
                                    ghost
                                    onClick={() => onDelete(item)}
                                    danger={item.isEnabled}
                                    icon={item.isEnabled ? <DeleteOutlined /> : <UndoOutlined />}
                                />
                                <Checkbox
                                    onChange={() => handleSelected(item)}
                                    checked={selectedItems.includes(item)}
                                />
                            </Space>
                        </List.Item>
                    );
                }}
            />
        </ReactDragListView>
    );
}

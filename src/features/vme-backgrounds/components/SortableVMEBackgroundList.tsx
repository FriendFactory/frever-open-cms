import React from "react";
import { Button, List, Space } from "antd";
import ReactDragListView from "react-drag-listview";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { VMEBackground } from "../services";
import { VMEBackgroundListItemMeta } from "./VMEBackgroundListItemMeta";
import { VMEBackgroundOrderField } from "./VMEBackgroundOrderField";

export interface SortableVMEBackgroundListProps {
    loading: boolean;
    data?: VMEBackground[];
    onUpdateValue: (item: VMEBackground, newSortOrder: number | null) => void;
    onDelete: (item: VMEBackground) => void;
}

export function SortableVMEBackgroundList({ data, loading, onUpdateValue, onDelete }: SortableVMEBackgroundListProps) {
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
                        <List.Item key={item.id} className="draggble">
                            <VMEBackgroundListItemMeta item={item} avatarSize={80} stage={stage} />
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
                            </Space>
                        </List.Item>
                    );
                }}
            />
        </ReactDragListView>
    );
}

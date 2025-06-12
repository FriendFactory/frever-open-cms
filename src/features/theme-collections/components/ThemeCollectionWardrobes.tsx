import React from "react";
import { Avatar, Button, InputNumberProps, List, Space, Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";

import { WardrobeShortInfo } from "../services";
import { createCdnURLFromFiles, InputNumberBlur } from "shared";
import { Link } from "react-router-dom";
import { DETAILS_ASSET_URL } from "urls";

interface ThemeCollectionWardrobesProps {
    stage: string;
    wardrobes?: WardrobeShortInfo[];
    onUpdate: (newWardrobes: WardrobeShortInfo[]) => void;
    onDelete?: (id: number) => void;
    currentWardrobeId?: number | null;
}

export function ThemeCollectionWardrobes({
    wardrobes,
    stage,
    currentWardrobeId,
    onUpdate,
    onDelete
}: ThemeCollectionWardrobesProps) {
    const handleOnDragEnd = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || !wardrobes) return;

        const newWardrobe = wardrobes.splice(fromIndex, 1)[0];
        wardrobes.splice(toIndex, 0, newWardrobe);

        onUpdate(wardrobes);
    };

    const handleOnChangeOrder = (fromIndex: number) => (inputValue: InputNumberProps["value"]) => {
        if (inputValue === null || inputValue === undefined) return;
        const toIndex = Number(inputValue);

        handleOnDragEnd(fromIndex, toIndex);
    };

    return (
        <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
            <List
                dataSource={wardrobes}
                renderItem={(item, index) => {
                    return (
                        <List.Item
                            key={item.id}
                            className="draggble"
                            extra={
                                onDelete && (
                                    <Space>
                                        <div onMouseDown={(e) => e.stopPropagation()}>
                                            <InputNumberBlur
                                                onChangeOrder={handleOnChangeOrder(index)}
                                                value={index}
                                                min={0}
                                                max={wardrobes ? wardrobes.length - 1 : 0}
                                                style={{ width: 60, marginLeft: "3em" }}
                                            />
                                        </div>
                                        <Button
                                            disabled={(wardrobes?.length ?? 0) < 1}
                                            danger
                                            icon={<MinusOutlined />}
                                            onClick={() => onDelete(item.id)}
                                        />
                                    </Space>
                                )
                            }>
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        shape="square"
                                        size={50}
                                        src={createCdnURLFromFiles({
                                            stage,
                                            id: item.id,
                                            entityType: "Wardrobe",
                                            resolution: "128x128",
                                            files: item.files
                                        })}
                                    />
                                }
                                title={
                                    <Space size="middle">
                                        <Link to={DETAILS_ASSET_URL.format({ stage, asset: "Wardrobe", id: item.id })}>
                                            {item.name}
                                        </Link>
                                        <Typography.Text type="secondary">{`#${index + 1}`}</Typography.Text>
                                        {item.id === currentWardrobeId && (
                                            <Typography.Text type="success">Current</Typography.Text>
                                        )}
                                    </Space>
                                }
                                description={`ID: ${item.id}`}
                            />
                        </List.Item>
                    );
                }}
            />
        </ReactDragListView>
    );
}

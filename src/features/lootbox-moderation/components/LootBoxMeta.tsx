import React from "react";
import { Avatar, Card, Divider, List, Space, Typography } from "antd";

import { LootBox } from "../services";
import { NO_IMAGE_URL, createCdnURLFromFiles } from "shared";

export interface LootBoxItemProps {
    item: LootBox;
    stage: string;
    itemType: "card" | "list-item";
}

export function LootBoxMeta({ stage, item, itemType }: LootBoxItemProps) {
    const Component = itemType === "card" ? Card.Meta : List.Item.Meta;

    return (
        <Component
            avatar={
                <Avatar
                    size={60}
                    shape="square"
                    src={
                        item?.files
                            ? createCdnURLFromFiles({
                                  stage,
                                  files: item?.files,
                                  entityType: "LootBox",
                                  resolution: "128x128",
                                  id: item.id
                              })
                            : NO_IMAGE_URL
                    }
                />
            }
            title={item.title}
            description={
                <Space wrap split={<Divider type="vertical" />}>
                    <Typography.Text>ID&thinsp;: {item.id}</Typography.Text>
                </Space>
            }
        />
    );
}

import React from "react";
import { Avatar, Card, Divider, List, Space, Typography } from "antd";

import { User } from "../services";
import { NO_IMAGE_URL, ProtectedLink, createCdnURLFromFiles } from "shared";
import { USER_DETAILS_INFO_URL } from "urls";

export interface UserListItemProps {
    item: User;
    stage: string;
    itemType: "card" | "list-item";
}

export function UserItemMeta({ stage, item, itemType }: UserListItemProps) {
    const Component = itemType === "card" ? Card.Meta : List.Item.Meta;

    return (
        <Component
            avatar={
                <Avatar
                    size={60}
                    src={
                        item.mainCharacter?.files
                            ? createCdnURLFromFiles({
                                  stage,
                                  files: item.mainCharacter?.files,
                                  entityType: "Character",
                                  resolution: "128x128",
                                  id: item.mainCharacterId
                              })
                            : NO_IMAGE_URL
                    }
                />
            }
            title={
                <ProtectedLink
                    target="_blank"
                    feature="Social"
                    to={USER_DETAILS_INFO_URL.format({
                        stage,
                        selector: "mainGroupId",
                        id: item.mainGroupId
                    })}>
                    {item.mainGroup.nickName}
                </ProtectedLink>
            }
            description={
                <Space wrap split={<Divider type="vertical" />}>
                    <Typography.Text>Group ID&thinsp;: {item.mainGroupId}</Typography.Text>
                    <Typography.Text>Contact: {item.email || item.phoneNumber}</Typography.Text>
                    {item.mainGroup.deletedAt && <Typography.Text type="danger">Deleted</Typography.Text>}
                    {item.mainGroup.isBlocked && <Typography.Text type="danger">Blocked</Typography.Text>}
                </Space>
            }
        />
    );
}

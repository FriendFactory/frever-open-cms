import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge, List } from "antd";

import { createCdnURLFromFiles } from "shared";
import { THEME_COLLECTIONS_DETAILS_URL } from "urls";
import { ThemeCollection } from "../services";

interface ThemeCollectionListItemMetaProps {
    item: ThemeCollection;
    avatarSize: number;
    stage: string;
    extra?: React.ReactNode;
}

export function ThemeCollectionListItemMeta({ item, stage, avatarSize, extra }: ThemeCollectionListItemMetaProps) {
    return (
        <List.Item.Meta
            title={<Link to={THEME_COLLECTIONS_DETAILS_URL.format({ stage, id: item.id })}>{item.name}</Link>}
            avatar={
                <Avatar
                    shape="square"
                    size={avatarSize}
                    src={createCdnURLFromFiles({
                        id: item.id,
                        files: item.files,
                        stage,
                        resolution: "128x128",
                        entityType: "ThemeCollection"
                    })}
                />
            }
            description={
                <div>
                    <div>ID: {item.id}</div>
                    <div>
                        <Badge color={item.isActive ? "blue" : "red"} text={item.isActive ? "Active" : "Inactive"} />
                    </div>
                    {extra && extra}
                </div>
            }
        />
    );
}

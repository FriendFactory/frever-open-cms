import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge, List } from "antd";

import { createCdnURLFromFiles } from "shared";
import { VME_BACKGROUND_DETAILS_URL } from "urls";
import { VMEBackground } from "../services";

interface VMEBackgroundListItemMetaProps {
    item: VMEBackground;
    avatarSize: number;
    stage: string;
    extra?: React.ReactNode;
}

export function VMEBackgroundListItemMeta({ item, stage, avatarSize, extra }: VMEBackgroundListItemMetaProps) {
    return (
        <List.Item.Meta
            title={<Link to={VME_BACKGROUND_DETAILS_URL.format({ stage, id: item.id })}>{item.name}</Link>}
            avatar={
                <Avatar
                    shape="square"
                    size={avatarSize}
                    src={createCdnURLFromFiles({
                        id: item.id,
                        files: item.files,
                        stage,
                        resolution: "128x128",
                        entityType: "SetLocationBackground"
                    })}
                />
            }
            description={
                <div>
                    <div>ID: {item.id}</div>
                    <Badge color={item.isEnabled ? "blue" : "red"} text={item.isEnabled ? "Enabled" : "Disabled"} />
                    {extra && extra}
                </div>
            }
        />
    );
}

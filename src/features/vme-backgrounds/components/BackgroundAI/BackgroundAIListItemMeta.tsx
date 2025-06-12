import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge, List } from "antd";

import { createCdnURLFromFiles } from "shared";
import { BackgroundAI } from "features/vme-backgrounds/services";
import { BACKGROUND_AI_DETAILS_URL } from "urls";

interface BackgroundAIListItemMetaProps {
    item: BackgroundAI;
    avatarSize: number;
    stage: string;
    extra?: React.ReactNode;
}

export function BackgroundAIListItemMeta({ item, stage, avatarSize, extra }: BackgroundAIListItemMetaProps) {
    return (
        <List.Item.Meta
            title={<Link to={BACKGROUND_AI_DETAILS_URL.format({ stage, id: item.id })}>{item.name}</Link>}
            avatar={
                <Avatar
                    shape="square"
                    size={avatarSize}
                    src={createCdnURLFromFiles({
                        id: item.id,
                        files: item.files,
                        stage,
                        resolution: "128x128",
                        entityType: "SetLocationBackgroundSettings"
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

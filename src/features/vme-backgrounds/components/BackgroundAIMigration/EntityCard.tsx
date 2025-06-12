import React from "react";
import { Avatar, Card, Typography } from "antd";

import { createCdnURLFromFiles } from "shared";

const { Meta } = Card;
const { Text } = Typography;

export interface EntityMovingInfoProps {
    entity: any;
    stage: string;
    entityType: string;
    operation?: "Update" | "Create" | "Delete";
    isDelete?: boolean;
    isMigrated?: boolean;
}

export function EntityCard({ entity, stage, entityType, operation, isDelete, isMigrated }: EntityMovingInfoProps) {
    if (!entity) return null;

    if (isDelete) {
        return (
            <Card>
                <Meta
                    avatar={<Avatar size={80} shape="square" src="" />}
                    title={"AI Background removed"}
                    description={entityType ? entityType : null}
                />
            </Card>
        );
    }
    if (operation === "Create") {
        return (
            <Card>
                <Meta
                    avatar={<Avatar size={80} shape="square" src="" />}
                    title={"New AI Background"}
                    description={
                        <div>
                            {entityType}
                            &nbsp;
                            {isMigrated && <Text type="danger">{entity.id ?? ""}</Text>}
                        </div>
                    }
                />
            </Card>
        );
    }

    return (
        <Card>
            <Meta
                avatar={
                    <Avatar
                        size={80}
                        shape="square"
                        src={createCdnURLFromFiles({
                            stage,
                            id: entity.id,
                            entityType,
                            files: entity?.files ?? [],
                            resolution: "128x128"
                        })}
                    />
                }
                title={entity.name}
                description={
                    <div>
                        <div>
                            {entityType}
                            &nbsp;
                            <Text type="danger">{entity?.id ?? ""}</Text>
                        </div>
                    </div>
                }
            />
        </Card>
    );
}

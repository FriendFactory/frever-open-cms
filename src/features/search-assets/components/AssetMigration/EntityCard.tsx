import React from "react";
import { Avatar, Card, Typography } from "antd";

import { MigrationEntity } from "features/search-assets/services";
import { createCdnURLFromFiles, CommonExtraDataType } from "shared";

const { Meta } = Card;
const { Text } = Typography;

export interface EntityMovingInfoProps {
    entity: any;
    assetType: MigrationEntity;
    stage: string;
    readinessList?: CommonExtraDataType[];
    entityType: string;
    operation?: "Update" | "Create" | "Delete";
    isDelete?: boolean;
    isMigrated?: boolean;
}

export function EntityCard({
    entity,
    stage,
    readinessList,
    entityType,
    operation,
    isDelete,
    isMigrated
}: EntityMovingInfoProps) {
    if (!entity) {
        return null;
    }
    if (isDelete) {
        return (
            <Card>
                <Meta
                    avatar={<Avatar size={80} shape="square" src="" />}
                    title={"Asset removed"}
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
                    title={"New asset"}
                    description={
                        <div>
                            {entityType && entityType}
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
                title={entity.name ?? entity.assetName ?? entity.assetBundleName}
                description={
                    <div>
                        <div>
                            {entityType && entityType}
                            &nbsp;
                            <Text type="danger">{entity?.id ?? ""}</Text>
                        </div>
                        <div>
                            {entity.readinessId
                                ? readinessList?.find((el) => el.id === entity.readinessId)?.name ?? "Unknown"
                                : null}
                        </div>
                    </div>
                }
            />
        </Card>
    );
}


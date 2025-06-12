import React from "react";
import { List, Row, Col, Typography } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { MigrationResponse } from "features/search-assets/services";
import { MigrationOperation } from "features/search-assets/store";
import { EntityCard } from "./EntityCard";

export interface MigrationListProps {
    backgroundsSelected: number[];
    currentStage: string;
    stage: string;
    responses: MigrationResponse[];
    operation: MigrationOperation;
    loading: boolean;
}

export function MigrationList({
    backgroundsSelected,
    currentStage,
    stage,
    responses,
    operation,
    loading
}: MigrationListProps) {
    const filteredResult = responses.map((entitys) => {
        if (operation === "migrate") {
            const newEntitys = entitys.data.filter((entity, index, self) => {
                return (
                    self.findIndex(
                        (ent) =>
                            ent.sourceEntity?.id === entity.sourceEntity?.id &&
                            (entity.operation === "Create" && ent.operation === "Update" ? false : true)
                    ) === index
                );
            });
            return {
                ok: entitys.ok,
                data: newEntitys
            };
        }
        return entitys;
    });

    return (
        <List
            itemLayout="vertical"
            loading={{
                spinning: loading,
                tip: operation === "preview" ? "Loading preview" : "Migration in progress"
            }}>
            {filteredResult.map((entitys, index) => (
                <React.Fragment key={index}>
                    {operation === "migrate" && !loading ? (
                        entitys?.ok ? (
                            <List.Item>
                                <Typography.Title type="success" level={3}>
                                    Entity and related entities has been migrated!
                                </Typography.Title>
                            </List.Item>
                        ) : (
                            <List.Item>
                                <Typography.Title type="warning" level={3}>
                                    Something went wrong!
                                </Typography.Title>
                            </List.Item>
                        )
                    ) : null}
                    <List.Item>
                        {entitys?.data
                            ?.sort((entity) =>
                                entity.sourceEntity ? (backgroundsSelected.includes(entity.sourceEntityId) ? -1 : 1) : 0
                            )
                            .map((entity, index) => (
                                <React.Fragment key={index}>
                                    {index === 0 && entity.stepType === "MigrateEntity" && (
                                        <List.Item.Meta title={entity.sourceEntity.name} />
                                    )}
                                    {entity.stepType === "MigrateEntity" && (
                                        <Row justify="space-between" align="middle" gutter={[16, 16]}>
                                            <CardWrapper>
                                                <EntityCard
                                                    entity={entity.sourceEntity}
                                                    stage={currentStage}
                                                    entityType={entity.entityType}
                                                    isDelete={entity.operation === "Delete"}
                                                />
                                            </CardWrapper>
                                            <div>
                                                <DoubleRightOutlined />
                                            </div>
                                            <CardWrapper>
                                                <EntityCard
                                                    entity={
                                                        entity.operation === "Delete"
                                                            ? entity.originalTargetEntity
                                                            : entity.operation === "Create" && operation === "migrate"
                                                            ? entity.actualTargetEntity
                                                            : entity.updatedTargetEntity
                                                    }
                                                    stage={stage}
                                                    entityType={entity.entityType}
                                                    operation={entity.operation}
                                                    isMigrated={operation === "migrate"}
                                                />
                                            </CardWrapper>
                                        </Row>
                                    )}
                                    {entity?.errors?.length ? (
                                        <Row>
                                            <Col span={24}>
                                                <Typography.Text type="danger">
                                                    This AI Background will not migrate. Error(s):
                                                </Typography.Text>
                                            </Col>
                                            {entity.errors.map((error: string, index: number) => (
                                                <Col key={index} span={24}>
                                                    <Typography.Text type="danger">{error}</Typography.Text>
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : null}
                                </React.Fragment>
                            ))}
                    </List.Item>
                </React.Fragment>
            ))}
        </List>
    );
}

const CardWrapper = styled.div`
    width: 47%;
    padding-bottom: 16px;
`;

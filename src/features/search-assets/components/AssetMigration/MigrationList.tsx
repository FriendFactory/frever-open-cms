import React from "react";
import { List, Row, Col, Typography } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { CommonExtraDataType } from "shared";
import { MigrationEntity, MigrationResponse } from "features/search-assets/services";
import { MigrationOperation } from "features/search-assets/store";
import { EntityCard } from ".";
import { ReadinessTag } from "shared/components/ReadinessTag";

const { Item } = List;
const { Text, Title } = Typography;

export interface MigrationListProps {
    assetsSelected: number[];
    readinessList?: CommonExtraDataType[];
    assetType: string;
    currentStage: string;
    nextStage: string;
    stage: string;
    responses: MigrationResponse[];
    operation: MigrationOperation;
    loading: boolean;
}

export function MigrationList({
    readinessList,
    assetsSelected,
    assetType,
    currentStage,
    nextStage,
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
            {filteredResult.map((entitys) => (
                <>
                    {operation === "migrate" && !loading ? (
                        entitys?.ok ? (
                            <Item>
                                <Title type="success" level={3}>
                                    Entity and related entities has been migrated!
                                </Title>
                            </Item>
                        ) : (
                            <Item>
                                <Title type="warning" level={3}>
                                    Something went wrong!
                                </Title>
                            </Item>
                        )
                    ) : null}
                    <Item>
                        {entitys?.data
                            ?.sort((entity) =>
                                entity.sourceEntity ? (assetsSelected.includes(entity.sourceEntityId) ? -1 : 1) : 0
                            )
                            .map((entity, index) => (
                                <>
                                    {index === 0 && entity.stepType === "MigrateEntity" && (
                                        <>
                                            <Item.Meta
                                                title={
                                                    entity.sourceEntity.name ??
                                                    entity.sourceEntity.assetName ??
                                                    entity.sourceEntity.assetBundleName
                                                }
                                                description={
                                                    entity.originalTargetEntity &&
                                                    entity.updatedTargetEntity &&
                                                    entity.originalTargetEntity?.readinessId !==
                                                        entity.updatedTargetEntity?.readinessId ? (
                                                        <>
                                                            <Text type="warning">
                                                                Warning. This asset is set to another readiness
                                                            </Text>
                                                            <br />
                                                            From:&nbsp;
                                                            <ReadinessTag
                                                                stage={nextStage}
                                                                readinessId={entity.originalTargetEntity?.readinessId}
                                                            />
                                                            &nbsp;To:&nbsp;
                                                            <ReadinessTag
                                                                stage={nextStage}
                                                                readinessId={entity.updatedTargetEntity?.readinessId}
                                                            />
                                                            &nbsp;
                                                        </>
                                                    ) : (
                                                        ""
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                    {entity.stepType === "MigrateEntity" && (
                                        <Row justify="space-between" align="middle" gutter={[16, 16]}>
                                            <CardWrapper>
                                                <EntityCard
                                                    entity={entity.sourceEntity}
                                                    assetType={assetType as MigrationEntity}
                                                    stage={currentStage}
                                                    readinessList={readinessList}
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
                                                    assetType={assetType as MigrationEntity}
                                                    stage={stage}
                                                    readinessList={readinessList}
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
                                                <Text type="danger">This asset will not migrate. Error(s):</Text>
                                            </Col>
                                            {entity.errors.map((error: string, index: number) => (
                                                <Col key={index} span={24}>
                                                    <Text type="danger">{error}</Text>
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : null}
                                </>
                            ))}
                    </Item>
                </>
            ))}
        </List>
    );
}

const CardWrapper = styled.div`
    width: 47%;
    padding-bottom: 16px;
`;

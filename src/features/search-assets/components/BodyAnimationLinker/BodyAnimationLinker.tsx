import React from "react";
import { Avatar, Button, Card, Col, Collapse, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { ClearOutlined, SwapOutlined } from "@ant-design/icons";

import { createCdnURLFromFiles } from "shared";
import { BodyAnimationAsset, CharacterSpawnPosition } from "features/search-assets/services";

export interface BodyAnimationLinkerProps {
    stage: string;
    bodyAnimation?: BodyAnimationAsset;
    characterSpawnPositions?: CharacterSpawnPosition[];
    isUnbindAvailable: boolean;
    isBindAvailable: boolean;
    isClearBtnAvailable: boolean;
    bindAssets: (action: "bind" | "unbind") => () => void;
    clearLinker: () => void;
}

export function BodyAnimationLinker({
    stage,
    bodyAnimation,
    characterSpawnPositions,
    isUnbindAvailable,
    isBindAvailable,
    isClearBtnAvailable,
    bindAssets,
    clearLinker
}: BodyAnimationLinkerProps) {
    return (
        <Collapse
            collapsible="header"
            bordered={false}
            items={[
                {
                    label: "Open details",
                    key: 1,
                    extra: (
                        <Row gutter={10}>
                            {isClearBtnAvailable && (
                                <Col>
                                    <Button onClick={clearLinker} icon={<ClearOutlined />} />
                                </Col>
                            )}
                            {isUnbindAvailable && (
                                <Col>
                                    <Button danger onClick={bindAssets("unbind")}>
                                        Unbind all
                                    </Button>
                                </Col>
                            )}
                            {isBindAvailable && (
                                <Col>
                                    <Button type="primary" onClick={bindAssets("bind")}>
                                        Bind all
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    ),
                    children: (
                        <Row justify="center" align="middle" gutter={[16, 10]}>
                            <Col xs={24} md={11}>
                                {bodyAnimation && (
                                    <Card>
                                        <Meta
                                            title={bodyAnimation?.name ?? ""}
                                            avatar={
                                                <Avatar
                                                    size={86}
                                                    shape="square"
                                                    src={createCdnURLFromFiles({
                                                        stage,
                                                        id: bodyAnimation?.id,
                                                        files: bodyAnimation?.files,
                                                        entityType: "BodyAnimation",
                                                        resolution: "128x128"
                                                    })}
                                                />
                                            }
                                            description={<Typography.Text>ID: {bodyAnimation.id}</Typography.Text>}
                                        />
                                    </Card>
                                )}
                            </Col>
                            <Col flex="0">
                                <SwapOutlined />
                            </Col>
                            <Col xs={24} md={11}>
                                <Row gutter={[0, 24]}>
                                    {characterSpawnPositions?.map((el) => (
                                        <Col span={24} key={el.id}>
                                            <Card>
                                                <Meta
                                                    title={el.name}
                                                    description={
                                                        <>
                                                            <Typography.Text>ID: {el.id}</Typography.Text>
                                                            <br />
                                                            Status:&nbsp;
                                                            {el.bodyAnimationAndCharacterSpawnPosition.some(
                                                                (el) => el.bodyAnimationId === bodyAnimation?.id
                                                            ) ? (
                                                                <Typography.Text type="success">Linked</Typography.Text>
                                                            ) : (
                                                                <Typography.Text type="warning">
                                                                    Non-Linked
                                                                </Typography.Text>
                                                            )}
                                                        </>
                                                    }
                                                    avatar={
                                                        <Avatar
                                                            size={86}
                                                            shape="square"
                                                            src={createCdnURLFromFiles({
                                                                stage,
                                                                id: el.id,
                                                                files: el.files,
                                                                entityType: "CharacterSpawnPosition",
                                                                resolution: "128x128"
                                                            })}
                                                        />
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    )
                }
            ]}
        />
    );
}

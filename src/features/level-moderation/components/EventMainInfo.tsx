import React from "react";
import { Card, Col, Result, Row } from "antd";
import dayjs from "dayjs";

import { LEVEL_DETAILS_URL } from "urls";
import { LevelEvent } from "../services";
import { ProtectedLink } from "shared";

const colArgs = { xs: 24, md: 12 };

export interface EventMainInfoProps {
    loading: boolean;
    data?: LevelEvent;
    stage: string;
}

export function EventMainInfo({ data, stage, loading }: EventMainInfoProps) {
    return (
        <Card title="Information" loading={loading} style={{ height: "100%" }}>
            {!!data ? (
                <Row gutter={[24, 24]} justify="start">
                    <Col {...colArgs}>Group ID: {data?.groupId ?? "Unknown"}</Col>
                    <Col {...colArgs}>Template ID: {data?.templateId ?? "None"}</Col>
                    <Col {...colArgs}>
                        Level ID:{" "}
                        {data?.levelId ? (
                            <ProtectedLink feature="Social" to={LEVEL_DETAILS_URL.format({ stage, id: data?.levelId })}>
                                {data?.levelId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Col>
                    <Col {...colArgs}>Level Sequence: {data?.levelSequence ?? "Unknown"}</Col>
                    <Col {...colArgs}>Duration: {dayjs.duration(data?.length).format("m:s") ?? "Unknown"}ms</Col>

                    <Col {...colArgs}>
                        Target Character Sequence Number: {data?.targetCharacterSequenceNumber ?? "Unknown"}
                    </Col>

                    <Col {...colArgs}>Character SpawnPosition Id: {data?.characterSpawnPositionId ?? "Unknown"}</Col>
                    <Col {...colArgs}>
                        Character Spawn Position Formation Id: {data?.characterSpawnPositionFormationId ?? "Unknown"}
                    </Col>
                    <Col {...colArgs}>
                        Created Time: {data && dayjs.utc(data?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                    </Col>
                    <Col {...colArgs}>
                        Modified Time: {data && dayjs.utc(data?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                    </Col>
                </Row>
            ) : (
                <Result status="404" title="Event is not found or not accessible" />
            )}
        </Card>
    );
}

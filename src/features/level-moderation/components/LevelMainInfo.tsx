import React from "react";
import { Card, Col as AntdCol, Row, Typography, ColProps } from "antd";
import dayjs from "dayjs";

import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { Level } from "../services";
import { ProtectedLink } from "shared";

const Col = (props: ColProps) => <AntdCol xs={24} md={12} {...props} />;

export interface LevelMainInfoProps {
    stage: string;
    level?: Level;
    loading: boolean;
    onSetSoftDelete: () => void;
}

export function LevelMainInfo({ stage, level, loading, onSetSoftDelete }: LevelMainInfoProps) {
    return (
        <Card title="Information" loading={loading} style={{ height: "100%" }}>
            {level && (
                <Row gutter={[24, 24]} justify="start">
                    <Col>Level ID: {level.id ?? "Unknown"}</Col>
                    <Col>Group ID: {level.groupId ?? "Unknown"}</Col>
                    <Col>
                        Video ID:&nbsp;
                        {level?.videoId ? (
                            <ProtectedLink
                                feature="VideoModeration"
                                to={VIDEO_MODERATION_DETAILS_URL.format({ stage, id: level.videoId })}>
                                {level.videoId}
                            </ProtectedLink>
                        ) : (
                            "Unknown"
                        )}
                    </Col>
                    <Col>Uploader Group ID: {level.originalGroupId ?? "Unknown"}</Col>
                    <Col>Is Draft: {level.isDraft === false ? "No" : level.isDraft === true ? "Yes" : "Unknown"}</Col>
                    <Col>Template ID: {level.levelTemplateId ?? "Unknown"}</Col>
                    <Col>Remix from: {level.remixedFromLevelId ?? "Unknown"}</Col>
                    <Col>Number of clips: {level.event?.length ?? "Unknown"}</Col>
                    <Col>
                        Is Deleted: {level.isDeleted ? "Yes" : "No"}&nbsp;&nbsp;
                        <Typography.Link onClick={onSetSoftDelete}>
                            {level.isDeleted ? "Undo" : "Delete"}
                        </Typography.Link>
                    </Col>
                    <Col>Is Converting: {level.isConverting ? "Yes" : "No"}</Col>
                    <Col>Contains Copyrighted Content: {level.containsCopyrightedContent ? "Yes" : "No"}</Col>
                    <Col>Created Time: {level && dayjs.utc(level.createdTime).format("DD MMM YYYY HH:mm:ss")}</Col>
                    <Col>Modified Time: {level && dayjs.utc(level.createdTime).format("DD MMM YYYY HH:mm:ss")}</Col>
                </Row>
            )}
        </Card>
    );
}

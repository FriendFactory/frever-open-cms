import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "antd";

import { useCurrentStage } from "shared";
import { VIDEO_MODERATION_DETAILS_URL } from "urls";

interface VideoDetailsRemixFromProps {
    remixFromVideoId: number;
}

export const VideoDetailsRemixFrom = ({ remixFromVideoId }: VideoDetailsRemixFromProps) => {
    const stage = useCurrentStage();
    return (
        <Card title="Remix from">
            <Row>
                <Col span={24}>
                    Remixed from Video:{" "}
                    <Link
                        to={VIDEO_MODERATION_DETAILS_URL.format({
                            stage,
                            id: remixFromVideoId
                        })}>
                        {remixFromVideoId}
                    </Link>
                </Col>
            </Row>
        </Card>
    );
};

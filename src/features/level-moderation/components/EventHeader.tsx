import React from "react";
import { Row, Typography } from "antd";
import dayjs from "dayjs";

import { PageHeader } from "shared";
import { LevelEvent } from "../services";

const { Text } = Typography;

export interface EventHeaderProps {
    id: number;
    event?: LevelEvent;
}

export function EventHeader({ id, event }: EventHeaderProps) {
    return (
        <PageHeader title={"Event: " + id} withBackButton>
            <Row justify="space-between">
                <Text type="secondary">
                    Created Time: {event && dayjs.utc(event?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                </Text>

                <Text type="secondary">
                    Modified Time: {event && dayjs.utc(event?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                </Text>
            </Row>
        </PageHeader>
    );
}

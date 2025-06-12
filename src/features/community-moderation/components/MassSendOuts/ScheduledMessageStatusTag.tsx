import React from "react";
import { Tag, TagProps } from "antd";

import { ScheduledMessage, ScheduledMessageStatus } from "features/community-moderation/services/api";

interface ScheduledMessageStatusTagProps {
    scheduledMessage: ScheduledMessage;
}

export const ScheduledMessageStatusTag = ({ scheduledMessage }: ScheduledMessageStatusTagProps) => (
    <Tag color={getStatusColor(scheduledMessage.status)} style={{ margin: 0 }}>
        {scheduledMessage.status}
    </Tag>
);

const getStatusColor = (status: ScheduledMessageStatus): TagProps["color"] => {
    switch (status) {
        case "scheduled":
            return "blue";
        case "pending":
            return "orange";
        case "canceled":
            return "red";
        case "completed":
            return "green";
        case "completed_with_errors":
            return "volcano";
        default:
            return "default";
    }
};

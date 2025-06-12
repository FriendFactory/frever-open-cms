import React from "react";
import { Divider, Space, Typography, theme } from "antd";
import { HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import dayjs from "dayjs";

import { ChatConversationMessage } from "features/community-moderation/services/api";

const { Text, Link } = Typography;

export interface ChatMessageExtraInfoProps {
    message: ChatConversationMessage;
    handleReply: (item: ChatConversationMessage) => void;
}

export function ChatMessageExtraInfo({ message, handleReply }: ChatMessageExtraInfoProps) {
    return (
        <Space wrap={true} split={<Divider type="vertical" />}>
            <Time type="secondary">{dayjs(message.time).format("DD MMM YYYY HH:mm:ss")}</Time>
            <Text type="secondary">
                <Space wrap={false} size={6}>
                    <PurpleHeartFilled />
                    &nbsp;{message.likeCount}
                </Space>
            </Text>
            <Link onClick={() => handleReply(message)}>Reply</Link>
        </Space>
    );
}

const PurpleHeartFilled = styled(HeartFilled)`
    color: ${() => theme.useToken().token["magenta-6"]};
`;

export const Time = styled(Text)`
    display: block;
    width: max-content;
    word-break: keep-all;
`;

import React from "react";
import { Divider, Space, Typography, theme } from "antd";
import { EyeInvisibleOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";

const { Link, Text } = Typography;

export interface ChatMessageExtraInfoProps {
    time: string;
    likeCount: number;
    isDeleted: boolean;
    isHidden: boolean;
    onChangeIsDeleted?: () => void;
}

export function ChatMessageExtraInfo({
    time,
    likeCount,
    isDeleted,
    isHidden,
    onChangeIsDeleted
}: ChatMessageExtraInfoProps) {
    return (
        <Space wrap={true} split={<Divider type="vertical" />}>
            <Time type="secondary">{time}</Time>
            <Text type="secondary">
                <Space wrap={false} size={6}>
                    <PurpleHeartFilled />
                    &nbsp;{likeCount}
                </Space>
            </Text>
            {isDeleted && (
                <Text type="secondary">
                    <Space wrap={false} size={6}>
                        <EyeInvisibleOutlined />
                        &nbsp; Message is deleted
                    </Space>
                </Text>
            )}
            {isHidden && (
                <Text type="secondary">
                    <Space wrap={false} size={6}>
                        <EyeInvisibleOutlined />
                        &nbsp; Message is hidden
                    </Space>
                </Text>
            )}
            {onChangeIsDeleted && (
                <Link type={!isDeleted ? "danger" : undefined} onClick={onChangeIsDeleted}>
                    {!isDeleted ? "Delete" : "Restore"}
                </Link>
            )}
        </Space>
    );
}

const PurpleHeartFilled = styled(HeartFilled)`
    color: ${() => theme.useToken().token["magenta-6"]};
`;

const Time = styled(Text)`
    display: block;
    width: max-content;
    word-break: keep-all;
`;

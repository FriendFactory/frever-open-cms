import React from "react";
import styled from "styled-components";
import { Avatar, Typography, theme, Tag as AntdTag } from "antd";

import { ChatMessageTemplate } from "./ChatMessageTemplate";

const { Text } = Typography;

export interface ChatSystemMessageItemProps {
    children: JSX.Element;
    deleted?: boolean;
    extra?: JSX.Element;
    avatarSize?: number;
}

export function ChatSystemMessageItem({ children, avatarSize, deleted, extra }: ChatSystemMessageItemProps) {
    return (
        <ChatMessageTemplate
            deleted={deleted}
            title={
                <Tag color="magenta">
                    <Nickname>System message</Nickname>
                </Tag>
            }
            avatar={
                <SystemAvatar shape="circle" size={avatarSize ?? 40}>
                    S
                </SystemAvatar>
            }
            message={children}
            extra={extra}
        />
    );
}

const SystemAvatar = styled(Avatar)`
    background-color: ${() => theme.useToken().token.orange3};
    color: ${() => theme.useToken().token.orange5};
`;

const Nickname = styled(Text)`
    display: block;
    color: ${() => theme.useToken().token.purple6};
`;

const Tag = styled(AntdTag)`
    max-width: fit-content;
`;

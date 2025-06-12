import React from "react";
import styled from "styled-components";
import { Avatar, Typography, theme, Tag, Space } from "antd";
import { Link } from "react-router-dom";

import { ChatMessageTemplate } from "./ChatMessageTemplate";
import { USER_DETAILS_INFO_URL } from "urls";
import { ThumbnailFile, createCdnURLFromFiles } from "shared";
import { ChatMessage } from "features/chats-moderation";

const { Text } = Typography;

export interface ChatMessageItemProps {
    children: JSX.Element;
    extra?: JSX.Element;
    stage: string;
    message: ChatMessage;
    tag: React.ReactNode;
    deleted?: boolean;
}

export function ChatMessageItem({ children, extra, stage, tag, deleted, message }: ChatMessageItemProps) {
    const title = message.group ? (
        <Link
            to={USER_DETAILS_INFO_URL.format({
                stage,
                selector: "mainGroupId",
                id: message.group.id
            })}>
            <Space wrap={false} size={0}>
                {tag}
                <Nickname strong>{message.group.nickname}</Nickname>
            </Space>
        </Link>
    ) : (
        <Tag color="red" style={{ display: "inline-block" }}>
            Unknown Member
        </Tag>
    );

    const avatar = !message.group ? (
        <UnknownUserAvatar size={64}>U</UnknownUserAvatar>
    ) : (
        <Avatar
            shape="circle"
            size={64}
            src={getMemberThunbmail(stage, message.group.mainCharacterId, message.group.mainCharacterFiles)}
        />
    );

    return <ChatMessageTemplate title={title} avatar={avatar} deleted={deleted} message={children} extra={extra} />;
}

const Nickname = styled(Text)`
    display: block;
    color: ${() => theme.useToken().token.purple6};
`;

export const getMemberThunbmail = (stage: string, id: number, files?: ThumbnailFile[]) =>
    files ? createCdnURLFromFiles({ id, files, stage, entityType: "Character", resolution: "128x128" }) : "";

const UnknownUserAvatar = styled(Avatar)`
    background-color: ${() => theme.useToken().token.red4};
    color: ${() => theme.useToken().token.red6};
`;

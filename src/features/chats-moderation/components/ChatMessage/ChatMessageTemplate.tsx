import React from "react";
import { Space } from "antd";
import styled from "styled-components";

export interface ChatMessageTemplateProps {
    title: JSX.Element;
    message: JSX.Element;
    avatar: JSX.Element;
    extra?: JSX.Element;
    deleted?: boolean;
}

export function ChatMessageTemplate({ extra, deleted, avatar, message, title }: ChatMessageTemplateProps) {
    return (
        <ChatMessageElementWrapper deleted={deleted ? "true" : "false"}>
            <Space wrap={false} align="start" size="middle">
                {avatar}

                <Space direction="vertical" size="small">
                    {title}

                    {message}

                    {extra && <ExtraWrapper>{extra}</ExtraWrapper>}
                </Space>
            </Space>
        </ChatMessageElementWrapper>
    );
}

const ChatMessageElementWrapper = styled.div<{ deleted: string }>`
    opacity: ${({ deleted }) => (deleted === "true" ? 0.6 : 1)};
`;

const ExtraWrapper = styled.div`
    padding-top: 0.5rem;
`;

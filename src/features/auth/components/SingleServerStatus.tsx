import React from "react";
import { Checkbox, Space, theme, Typography } from "antd";
import styled from "styled-components";
import {
    Loading3QuartersOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons";

import { ServerStatus } from "./ServerLoginStatus";

export interface SingleServerStatusProps {
    disableCheckbox: boolean;
    data: ServerStatus;
    handleSelectServerToLogin: (serverId: string, selected: boolean) => void;
}

export function SingleServerStatus({ disableCheckbox, data, handleSelectServerToLogin }: SingleServerStatusProps) {
    const { token } = theme.useToken();
    return (
        <SingleServerStatusStyled
            onClick={() => !disableCheckbox && handleSelectServerToLogin(data.id, !data.selected)}>
            <Space>
                <Space size="large">
                    <Checkbox disabled={disableCheckbox} checked={data.selected} />
                    <span>{data.title}</span>
                </Space>
                {data.error && <Typography.Text type="danger">{data.error}</Typography.Text>}
            </Space>
            &nbsp;
            <StatusIcon
                color={
                    data.state === "running"
                        ? token.colorPrimaryActive
                        : data.state === "success"
                        ? token.colorSuccessActive
                        : data.state === "error"
                        ? token.colorErrorActive
                        : token.colorPrimaryText
                }>
                {data.state === "running" ? (
                    <Loading3QuartersOutlined spin />
                ) : data.state === "success" ? (
                    <CheckCircleOutlined />
                ) : data.state === "error" ? (
                    <ExclamationCircleOutlined />
                ) : (
                    <QuestionCircleOutlined />
                )}
            </StatusIcon>
        </SingleServerStatusStyled>
    );
}

const SingleServerStatusStyled = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const StatusIcon = styled.i<{ color: string }>`
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 1.5em;

    color: ${(props) => props.color};
`;

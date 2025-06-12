import React, { ReactNode } from "react";
import { Space, Typography } from "antd";
import styled from "styled-components";

import { BackButton } from "./BackButton";

export interface PageHeaderProps {
    title?: React.ReactNode;
    extra?: ReactNode;
    children?: React.ReactNode;
    withBackButton?: boolean;
    padding?: number;
}

export function PageHeader({ title, extra, withBackButton, padding, children }: PageHeaderProps) {
    return (
        <Container padding={padding}>
            <Content>
                <Content wrap="nowrap">
                    {withBackButton && <BackButton />}
                    <Typography.Title ellipsis level={4}>
                        {title}
                    </Typography.Title>
                </Content>
                <Space>{extra}</Space>
            </Content>

            {children && <div>{children}</div>}
        </Container>
    );
}

const Container = styled.div<{ padding?: number }>`
    padding: ${(props) => props.padding ?? 24}px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Content = styled.div<{ wrap?: "wrap" | "nowrap" }>`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: ${(props) => props.wrap ?? "wrap"};
    & .ant-typography {
        margin: 0;
    }
`;

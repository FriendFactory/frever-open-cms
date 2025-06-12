import React from "react";
import styled from "styled-components";

import { PageHeader, PageHeaderProps } from "shared/components/PageHeader";
import { theme } from "antd";
import { siderWidth } from "layout";

export const FixedPageHeader = ({
    open,
    ...props
}: { open?: boolean } & Omit<PageHeaderProps, "withBackButton" | "children" | "padding">) => {
    return open === false ? null : (
        <FixedPageHeaderStyled siderWidth={siderWidth}>
            <PageHeader {...props} padding={16} />
        </FixedPageHeaderStyled>
    );
};

const FixedPageHeaderStyled = styled.div<{ siderWidth: number }>`
    position: fixed !important;
    z-index: 999;
    top: 0;
    left: ${(props) => props.siderWidth}px;
    width: calc(100% - ${(props) => props.siderWidth}px);
    height: 64px;
    background-color: ${() => {
        const { token } = theme.useToken();
        return token.colorBgElevated;
    }};

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);

    @media (max-width: ${() => {
            const { token } = theme.useToken();
            return token.screenLG;
        }}px) {
        left: 0;
        width: 100%;
    }
`;

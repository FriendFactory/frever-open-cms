import React from "react";
import { Button, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { LOGIN_PAGE_URL } from "urls";
import { resetAuth } from "features/auth";
import { resetCurrentStageTab } from "shared/services";

export function LogoutContainer() {
    const { token } = theme.useToken();

    return (
        <Button onClick={goToLoginPage} icon={<LogoutOutlined />}>
            <LogoutTextWrapper breakpoint={token.screenLGMax}>Logout</LogoutTextWrapper>
        </Button>
    );
}

const LogoutTextWrapper = styled.span<{ breakpoint: number }>`
    @media (max-width: ${(props) => props.breakpoint}px) {
        display: none !important;
    }
`;

const goToLoginPage = () => {
    resetAuth();
    resetCurrentStageTab();
    const signInUrl = LOGIN_PAGE_URL.format({});
    window.location.assign(signInUrl);
};

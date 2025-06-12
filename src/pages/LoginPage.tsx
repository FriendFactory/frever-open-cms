import React from "react";
import styled from "styled-components";

import { BlankLayout } from "layout";
import { Logo } from "shared";
import { LoginContainer, ServerLoginStatusContainer } from "features/auth";
import { theme } from "antd";

export function LoginPage() {
    const { token } = theme.useToken();
    return (
        <BlankLayout background={token.colorBgElevated}>
            <Wrapper>
                <Logo height="200px" />
                <LoginContainer />
                <br />
                <ServerLoginStatusContainer />
            </Wrapper>
        </BlankLayout>
    );
}

const Wrapper = styled.div`
    width: clamp(340px, 50%, 550px) !important;
`;

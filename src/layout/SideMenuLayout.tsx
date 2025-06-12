import React from "react";
import { Layout, theme } from "antd";
import styled from "styled-components";

import { SideMenu } from "shared";
import { NavBar } from "shared/components";
import { PopUpMessageContainer } from "shared/containers/PopUpMessageContainer";

const { Header, Sider, Content } = Layout;

export const siderWidth = 220;

export interface SideMenuLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

export function SideMenuLayout({ children }: SideMenuLayoutProps) {
    const { token } = theme.useToken();

    return (
        <CustomLayout>
            <CustomHeader background={token.colorBgElevated}>
                <NavBar>
                    <SideMenu />
                </NavBar>
            </CustomHeader>
            <Layout>
                <CustomSider
                    background={token.colorBgElevated}
                    width={siderWidth}
                    theme="light"
                    breakpoint="lg"
                    collapsedWidth={0}
                    trigger={null}>
                    <SideMenu />
                </CustomSider>
                <CustomContent>
                    <>
                        {children}
                        <PopUpMessageContainer />
                    </>
                </CustomContent>
            </Layout>
        </CustomLayout>
    );
}

const CustomSider = styled(Sider)<{ background: string }>`
    background: ${(props) => props.background} !important;

    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0 !important;
    width: 100% !important;
    max-height: 100vh !important;
    overflow: scroll !important;

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const CustomLayout = styled(Layout)`
    min-height: 100vh !important;
`;

const CustomContent = styled(Content)`
    max-width: 2560px;
    margin-right: auto;
    margin-left: auto;

    .ant-tabs-nav-list {
        padding-left: 24px;
    }
`;

const CustomHeader = styled(Header)<{ background: string }>`
    padding-left: 14px !important;
    padding-right: 14px !important;
    background: ${(props) => props.background} !important;
`;

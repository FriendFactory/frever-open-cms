import React, { useState } from "react";
import { Drawer, Button, Row, Col, theme, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { Logo, LogoutContainer } from "shared";
import { SettingsMenu } from "./SettingsMenu";

const drawerStyles = { header: { display: "none" }, body: { padding: 0 } };
const contentWrapperStyle: React.CSSProperties = { width: 250 };

export interface NavBarProps {
    children: JSX.Element;
}

export function NavBar({ children }: NavBarProps) {
    const { token } = theme.useToken();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const showDrawer = () => setIsDrawerOpen(true);
    const hideDrawer = () => setIsDrawerOpen(false);

    return (
        <nav>
            <Row wrap={false} justify="space-between">
                <MobileMenu breakpoint={token.screenLGMin} flex="0 0 86px">
                    <Button icon={<MenuOutlined />} onClick={showDrawer} />
                </MobileMenu>

                <Col>
                    <Logo width="200px" />
                </Col>

                <Col>
                    <Space>
                        <SettingsMenu />
                        <LogoutContainer />
                    </Space>
                </Col>
            </Row>
            <Drawer
                styles={drawerStyles}
                contentWrapperStyle={contentWrapperStyle}
                placement="left"
                closeIcon={false}
                onClose={hideDrawer}
                open={isDrawerOpen}>
                {children}
            </Drawer>
        </nav>
    );
}

const MobileMenu = styled(Col)<{ breakpoint: number }>`
    @media (min-width: ${(props) => props.breakpoint}px) {
        display: none !important;
    }
`;

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";

export interface ChatPageLayoutProps {
    children: [header: React.ReactNode, right: React.ReactNode, left: React.ReactNode];
}

export const ChatPageLayout = ({ children }: ChatPageLayoutProps) => {
    const [header, right, left] = children;
    const { isRightVisible } = useRightPaneVisibility();

    return (
        <Container>
            <Row>
                <Col span={24}>
                    <Header>{header}</Header>
                </Col>
            </Row>
            <Row gutter={[8, 8]} wrap={false}>
                <Col span={isRightVisible ? 8 : 24} style={{ minWidth: "350px" }}>
                    <Left>{left}</Left>
                </Col>
                {isRightVisible && (
                    <Col flex="auto">
                        <Right>{right}</Right>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

interface ContainerProps {}

const Container = styled.div<ContainerProps>``;

const Header = styled.div``;

const Left = styled.div``;

const Right = styled.div``;

interface RightPaneVisibilityContext {
    isRightVisible: boolean;
    closeWindow: () => void;
    openWindow: () => void;
}

const RightPaneVisibilityContext = createContext<RightPaneVisibilityContext>({} as RightPaneVisibilityContext);

export const useRightPaneVisibility = () => {
    return useContext(RightPaneVisibilityContext);
};

export const RightPaneVisibilityProvider = ({ children }: { children: ReactNode }) => {
    const [isRightVisible, setIsRightVisible] = useState(false);

    const closeWindow = () => setIsRightVisible(false);
    const openWindow = () => setIsRightVisible(true);

    return (
        <RightPaneVisibilityContext.Provider value={{ isRightVisible, closeWindow, openWindow }}>
            {children}
        </RightPaneVisibilityContext.Provider>
    );
};

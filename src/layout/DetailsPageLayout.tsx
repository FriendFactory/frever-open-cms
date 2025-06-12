import React from "react";
import { theme } from "antd";
import styled from "styled-components";

export const baseSideBlockWidth = 320;

export interface DetailsPageLayoutProps {
    children: [right: React.ReactChild, left: React.ReactChild, bottom?: React.ReactChild];
    reversed?: boolean;
    padding?: number | string;
    sideBlockWidth?: number;
}

export const DetailsPageLayout = ({ children, ...styledProps }: DetailsPageLayoutProps) => {
    const { token } = theme.useToken();
    const [right, left, bottom] = children;

    return (
        <DetailsPageLayoutWrapper screenXSMax={token.screenSMMax} padding={token.paddingLG + "px"} {...styledProps}>
            <div>{right}</div>
            <div>{left}</div>
            <div>{bottom}</div>
        </DetailsPageLayoutWrapper>
    );
};

export const DetailsPageLayoutWrapper = styled.div<{ screenXSMax?: number } & Omit<DetailsPageLayoutProps, "children">>`
    min-height: 100vh;
    padding: ${(props) => props.padding};

    display: grid;
    grid-gap: ${(props) => props.padding};

    grid-template-columns: ${(props) =>
        !props.reversed
            ? `2fr ${props.sideBlockWidth ?? baseSideBlockWidth}px`
            : `${props.sideBlockWidth ?? baseSideBlockWidth}px 2fr`};

    grid-template-areas: ${(props) =>
        !props.reversed
            ? `"left right"
        "bottom bottom"`
            : `"right left"
        "bottom bottom"`};

    @media (max-width: ${(props) => props.screenXSMax}px) {
        grid-template-columns: 100%;
        grid-template-areas:
            "right"
            "left"
            "bottom";
    }

    > :nth-child(1) {
        grid-area: left;
    }
    > :nth-child(2) {
        grid-area: right;

        @media (max-width: ${(props) => props.screenXSMax}px) {
            margin: 0 auto;
            max-width: 360px !important;
        }
    }
    > :nth-child(3) {
        grid-area: bottom;
    }
`;

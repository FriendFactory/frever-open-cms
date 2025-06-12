import React from "react";
import { theme } from "antd";
import styled from "styled-components";

export interface ContentWithHeaderFragmentProps {
    children: [header: React.ReactChild, content: React.ReactChild];
}

export function ContentWithHeaderFragment({ children }: ContentWithHeaderFragmentProps) {
    const { token } = theme.useToken();
    const [header, content] = children;
    return (
        <Wrapper background={token.colorBgLayout}>
            <div>{header}</div>
            <div>{content}</div>
        </Wrapper>
    );
}

const Wrapper = styled.div<{ background: string }>`
    background: ${(props) => props.background};
`;

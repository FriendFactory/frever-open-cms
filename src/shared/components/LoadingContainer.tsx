import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

export interface LoadingContainerProps {
    loading: boolean;
}

export function LoadingContainer({ loading }: LoadingContainerProps) {
    if (!loading) {
        return null;
    }

    return (
        <LoadingContainerWrapper>
            <Spin />
        </LoadingContainerWrapper>
    );
}

const LoadingContainerWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100%;
`;

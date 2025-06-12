import React from "react";
import { Divider } from "antd";
import styled from "styled-components";

export interface CustomSelectRenderProps {
    menu: JSX.Element;
    createFragment: JSX.Element;
}

export function CustomSelectRender({ menu, createFragment }: CustomSelectRenderProps) {
    return (
        <CustomSelectRenderWrapper>
            {menu}
            <Divider orientation="left">Add new record</Divider>
            <div>{createFragment}</div>
        </CustomSelectRenderWrapper>
    );
}

const CustomSelectRenderWrapper = styled.div`
    padding: 8px;
    .ant-divider {
        margin: 8px 0px;
    }
`;

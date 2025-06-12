import styled from "styled-components";
import { theme } from "antd";

export const BlankLayout = styled.div<{ padding?: number; background?: string }>`
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background: ${(props) => {
        const { token } = theme.useToken();
        return props.background ?? token.colorBgBase;
    }};
`;

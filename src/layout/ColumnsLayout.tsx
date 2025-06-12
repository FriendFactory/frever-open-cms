import { theme } from "antd";
import styled from "styled-components";

export const ColumnsLayout = styled.div<{ gap?: number }>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    align-self: stretch;
    gap: ${(props) => {
        const { token } = theme.useToken();
        return props.gap ?? token.paddingLG;
    }}px;
`;

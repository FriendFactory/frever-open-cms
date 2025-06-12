import { Col, theme } from "antd";
import styled from "styled-components";

export const ColAlignRight = styled(Col)`
    margin-left: auto !important;

    @media (max-width: ${() => theme.useToken().token.screenXSMax}px) {
        margin-left: initial !important;
    }
`;

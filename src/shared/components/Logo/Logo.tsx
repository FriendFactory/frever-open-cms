import styled from "styled-components";

import FreverLogo from "/public/assets/FreverLogo.svg";

export interface LogoStyledProps {
    width?: string;
    height?: string;
}

export const Logo = styled.div<LogoStyledProps>`
    width: ${(props) => props.width ?? "100%"};
    height: ${(props) => props.height ?? "100%"};

    background-size: contain !important;
    background-position-y: center !important;
    background: url(${FreverLogo as any}) scroll no-repeat;
`;

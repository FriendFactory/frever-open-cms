import styled from "styled-components";

export const ContentBlankLayout = styled.div<{ padding?: number }>`
    min-height: 100vh;
    padding: ${(props) => props.padding ?? 24}px;
`;

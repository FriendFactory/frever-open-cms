import { theme } from "antd";
import styled from "styled-components";

export const ReplyWrapper = styled.div`
    padding: 0 0 1rem 1rem;
    margin-left: 4.25rem;
    margin-bottom: 1rem;

    border-left: solid 0.25rem ${() => theme.useToken().token.colorBorder};

    & span {
        font-size: 0.9rem !important;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

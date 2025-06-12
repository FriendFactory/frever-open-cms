import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export const BackButton = () => {
    const history = useHistory();
    return (
        <BackIconLink>
            <ArrowLeftOutlined onClick={history.goBack} />
        </BackIconLink>
    );
};

const BackIconLink = styled.a`
    font-size: 20px;
    margin-right: 16px;
`;

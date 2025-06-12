import React from "react";
import styled from "styled-components";
import { Space, Typography } from "antd";

import CoinIcon from "./CustomIcons/CoinIcon";
import GemIcon from "./CustomIcons/GemIcon";

export const CurrencyPrice = ({ type, value }: { type: "soft" | "hard"; value: number }) => {
    return (
        <CurrencyWrapper wrap={false} size="small" align="center">
            {type === "soft" ? <CoinIcon /> : <GemIcon />}
            <Typography.Title level={5}> {value}</Typography.Title>
        </CurrencyWrapper>
    );
};

const CurrencyWrapper = styled(Space)`
    h5 {
        font-weight: 600;
        margin: 0;
        padding: 0;
    }
`;

import React from "react";
import { Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { AssetOfferWithAssetInfo } from "features/search-assets/services";
import { ColumnsLayout } from "layout/ColumnsLayout";

export interface AssetOfferInfoProps {
    value: AssetOfferWithAssetInfo;
}

export function AssetOfferInfo({ value }: AssetOfferInfoProps) {
    return (
        <AssetOfferInfoWrapper>
            <div>{value.assetOffer.id + ". " + value.assetOffer.title ?? ""}</div>
            <div>
                <Tooltip
                    color="blue"
                    title={
                        <ColumnsLayout gap={10}>
                            <span>Title: {value.assetOffer.title ?? "None"}</span>
                            <span>Soft Currency Price: {value.assetOffer.softCurrencyPrice ?? "None"}</span>
                            <span>Hard Currency Price: {value.assetOffer.hardCurrencyPrice ?? "None"}</span>
                            <span>Description: {value.assetOffer.description ?? "None"}</span>
                        </ColumnsLayout>
                    }>
                    <Button type="link" icon={<QuestionCircleOutlined />} />
                </Tooltip>
            </div>
        </AssetOfferInfoWrapper>
    );
}

const AssetOfferInfoWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
`;

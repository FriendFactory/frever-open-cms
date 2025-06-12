import React from "react";
import { Card, Col, Empty, Row, Space, Typography } from "antd";
import dayjs from "dayjs";

import { AssetOfferWithAssetInfo, AssetOfferType, WardrobeAsset } from "features/search-assets/services";
import { CreateAssetOfferContainer } from "features/search-assets/containers/AssetOffer/CreateAssetOfferContainer";
import { DeactivateAssetOfferContainer } from "features/search-assets/containers/AssetOffer/DeactivateAssetOfferContainer";

export interface AssetStoreInfoProps {
    stage: string;
    loading: boolean;
    data?: AssetOfferWithAssetInfo | null;
    assetId: number;
    assetType: AssetOfferType;
    wardrobe?: WardrobeAsset;
}

export function AssetStoreInfo({ loading, data, stage, assetId, assetType, wardrobe }: AssetStoreInfoProps) {
    return (
        <Card
            title="Asset Store Information"
            loading={loading}
            extra={
                <Space wrap={false} size={16}>
                    {!loading && (
                        <Typography.Link>
                            <CreateAssetOfferContainer
                                stage={stage}
                                assetHasActiveOffer={data?.isActive ?? false}
                                assetIds={[assetId]}
                                assetType={assetType}
                                wardrobe={wardrobe}
                            />
                        </Typography.Link>
                    )}

                    {data && (
                        <Typography.Link type="danger">
                            <DeactivateAssetOfferContainer stage={stage} assetOffer={data} />
                        </Typography.Link>
                    )}
                </Space>
            }>
            {data ? (
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        ID: {data.assetOffer?.id ?? "Unknown"}
                    </Col>
                    <Col xs={24} md={12}>
                        Group ID: {data.assetOffer?.createdByGroupId ?? "Unknown"}
                    </Col>
                    <Col xs={24} md={12}>
                        Title: {data.assetOffer?.title ?? "None"}
                    </Col>
                    <Col xs={24} md={12}>
                        Description: {data.assetOffer.description ?? "None"}
                    </Col>
                    <Col xs={24} md={12}>
                        Is Active: {data.assetOffer.isActive.toString() ?? "Unknown"}
                    </Col>
                    <Col xs={24} md={12}>
                        Created Time: {dayjs.utc(data.assetOffer.createdTime).format("DD MMM YYYY  HH:mm:ss") ?? "Unknown"}
                    </Col>
                    <Col xs={24} md={12}>
                        Soft Price: {data.assetOffer?.softCurrencyPrice ?? "None"}
                    </Col>
                    <Col xs={24} md={12}>
                        Hard Price: {data.assetOffer?.hardCurrencyPrice ?? "None"}
                    </Col>
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}

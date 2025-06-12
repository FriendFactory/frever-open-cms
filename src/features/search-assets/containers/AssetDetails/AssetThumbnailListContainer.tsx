import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Card, Col, Empty, Row } from "antd";

import { assetDetailsSelector } from "../../store";
import { DETAILS_ASSET_URL } from "urls";
import { AssetThumbnailContainer } from "./AssetThumbnailContainer";

export interface AssetThumbnailListContainerProps {}

export function AssetThumbnailListContainer({}: AssetThumbnailListContainerProps) {
    const location = useLocation();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { asset, stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, asset, id));

    const files = useMemo(
        () =>
            info.data?.files
                ?.filter((el) => el.file === 1)
                .sort((a, b) => {
                    const [widthA] = a.resolution.split("x");
                    const [widthB] = b.resolution.split("x");
                    return Number(widthB) - Number(widthA);
                }),
        [info.data]
    );

    return (
        <Card loading={!info.data && info.loading}>
            {files ? (
                <Row gutter={[0, 16]}>
                    {files.map((file) => (
                        <Col key={file.resolution} span={24}>
                            <AssetThumbnailContainer stage={stage} id={id} entityType={asset} file={file} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty />
            )}
        </Card>
    );
}

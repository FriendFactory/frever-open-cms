import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Card, Empty, Image } from "antd";

import { createCdnURLFromFiles } from "shared";
import { OUTFIT_DETAILS_URL } from "urls";
import { outfitDetailsPageSelector } from "../store/reducer/outfitDetails.reducer";

export interface OutfitThumbnailContainerProps {}

export function OutfitThumbnailContainer({}: OutfitThumbnailContainerProps) {
    const location = useLocation();
    const urlMatch = OUTFIT_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;

    const info = useSelector(outfitDetailsPageSelector(stage, id));

    const thumbnailUrl =
        info.data &&
        createCdnURLFromFiles({
            id: id,
            files: info.data?.files,
            stage,
            entityType: "outfit",
            resolution: "512x512"
        });

    return (
        <Card title="Thumbnail" loading={info.loading}>
            {thumbnailUrl ? <Image height="512" src={thumbnailUrl} /> : <Empty />}
        </Card>
    );
}

import React from "react";
import { Card, Image } from "antd";

export interface EventThumbnailProps {
    loading: boolean;
    thumbnailUrl?: string;
}

export function EventThumbnail({ thumbnailUrl, loading }: EventThumbnailProps) {
    return (
        <Card title="Thumbnail" loading={loading} style={{ height: "100%" }}>
            <Image src={thumbnailUrl ?? ""} />
        </Card>
    );
}

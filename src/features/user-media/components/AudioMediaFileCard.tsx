import React from "react";
import { Card } from "antd";

import { AudioPlayer } from "shared";

export interface AudioMediaFileCardProps {
    loading: boolean;
    url?: string;
    extra?: React.ReactNode;
}

export function AudioMediaFileCard({ loading, url, extra }: AudioMediaFileCardProps) {
    return (
        <Card title="Media file" loading={loading} extra={extra}>
            {url && <AudioPlayer key={url} src={url} />}
        </Card>
    );
}

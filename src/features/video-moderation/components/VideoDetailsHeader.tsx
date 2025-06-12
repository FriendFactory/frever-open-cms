import React from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { PageHeader } from "shared/components";

export interface VideoDetailsHeaderProps {
    id: number | string;
    isPrevVideoAvailable?: boolean;
    isNextVideoAvailable?: boolean;
    goBack: () => void;
    nextVideo: () => void;
    prevVideo: () => void;
}

export function VideoDetailsHeader({
    id,
    isPrevVideoAvailable,
    isNextVideoAvailable,

    nextVideo,
    prevVideo
}: VideoDetailsHeaderProps) {
    return (
        <PageHeader
            title={"Video: " + id}
            withBackButton
            extra={[
                <Button key="prev-video" onClick={prevVideo} disabled={!isPrevVideoAvailable} type="link">
                    <LeftOutlined />
                    Prev. Video
                </Button>,

                <Button key="next-video" onClick={nextVideo} disabled={!isNextVideoAvailable} type="link">
                    Next Video
                    <RightOutlined />
                </Button>
            ]}
        />
    );
}

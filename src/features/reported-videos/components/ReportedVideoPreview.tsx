import React from "react";
import { Collapse, Skeleton } from "antd";
import styled from "styled-components";

import { ChatVideoThumbnailContainer } from "features/chats-moderation/containers/ChatVideoThumbnailContainer";
import { useCurrentStage } from "shared";

const MEDIA_HEIGHT = 200;

interface ReportedVideoPreviewProps {
    videoId: number;
}

export function ReportedVideoPreview({ videoId }: ReportedVideoPreviewProps) {
    const stage = useCurrentStage();
    return (
        <CollapseStyled
            ghost
            items={[
                {
                    key: videoId,
                    label: "Preview",
                    forceRender: false,
                    children: (
                        <ChatVideoThumbnailContainer
                            stage={stage}
                            videoId={videoId}
                            height={MEDIA_HEIGHT}
                            skeleton={<SkeletonStyled height={MEDIA_HEIGHT} active={true} />}
                        />
                    )
                }
            ]}
        />
    );
}

const CollapseStyled = styled(Collapse)`
    .ant-collapse-header {
        padding: 0 0 !important;
    }
`;

const SkeletonStyled = styled(Skeleton.Image)<{ height: number }>`
    height: ${(props) => props.height};
`;

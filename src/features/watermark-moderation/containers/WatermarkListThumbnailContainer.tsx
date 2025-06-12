import React from "react";
import { Avatar, Skeleton } from "antd";

import { NO_IMAGE_URL, useLoadCdnLink } from "shared";
import styled from "styled-components";

const AVATAR_SIZE = 85;

interface WatermarkListThumbnailContainerProps {
    stage: string;
    id: number;
    version?: string | null;
    size?: number;
}

export function WatermarkListThumbnailContainer({ stage, id, version, size }: WatermarkListThumbnailContainerProps) {
    const { loading, url } = useLoadCdnLink(
        stage,
        version
            ? {
                  id,
                  entityName: "Watermark",
                  version
              }
            : null
    );

    return loading ? (
        <SkeletonImg active size={size ?? AVATAR_SIZE} />
    ) : (
        <AvatarStyled shape="square" size={size ?? AVATAR_SIZE} src={url ?? NO_IMAGE_URL} />
    );
}

const SkeletonImg = styled(Skeleton.Image)<{ size: number }>`
    width: ${(props) => props.size ?? AVATAR_SIZE}px;
    height: ${(props) => props.size ?? AVATAR_SIZE}px; ;
`;

const AvatarStyled = styled(Avatar)`
    img {
        object-fit: contain !important;
    }
`;

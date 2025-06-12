import React from "react";
import { Avatar, Skeleton } from "antd";

import { NO_IMAGE_URL, useLoadCdnLink } from "shared";
import styled from "styled-components";

const AVATAR_SIZE = 85;

interface CrewListThumbnailProps {
    stage: string;
    id: number;
    version?: string | null;
    size?: number;
}

export function CrewListThumbnail({ stage, id, version, size }: CrewListThumbnailProps) {
    const { loading, url } = useLoadCdnLink(
        stage,
        version
            ? {
                  id,
                  entityName: "Crew",
                  version
              }
            : null
    );

    return loading ? (
        <SkeletonImg active size={size ?? AVATAR_SIZE} />
    ) : (
        <Avatar shape="square" size={size ?? AVATAR_SIZE} src={url ?? NO_IMAGE_URL} />
    );
}

const SkeletonImg = styled(Skeleton.Image)<{ size: number }>`
    width: ${(props) => props.size ?? AVATAR_SIZE}px;
    height: ${(props) => props.size ?? AVATAR_SIZE}px; ;
`;

import React from "react";
import { Image, Skeleton } from "antd";
import styled from "styled-components";

import { StorageFile } from "../services";
import { useStorageFileCdnLink } from "../hooks/useStorageFileCdnLink";

export interface StorageFileImageProps {
    value: StorageFile;
}

export function StorageFileImage({ value }: StorageFileImageProps) {
    const cdnLink = useStorageFileCdnLink(value.version, value.extension, value.key);

    return cdnLink?.ok ? (
        <ImageStyled src={cdnLink.link} width={200} />
    ) : (
        <SkeletonImageStyled active={cdnLink?.loading} />
    );
}

const ImageStyled = styled(Image)`
    object-fit: contain;
    aspect-ratio: 4/5;
`;

const SkeletonImageStyled = styled(Skeleton.Image)`
    .ant-skeleton-image {
        width: 200px !important;
        height: 100% !important;
        aspect-ratio: 4/5 !important;
    }
`;

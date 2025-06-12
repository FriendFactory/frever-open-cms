import React, { memo } from "react";
import { Image } from "antd";

import { useLoadCdnLink } from "shared";

export interface ChatFileContainerProps {
    stage: string;
    id: number;
    version: string;
    entityName: string;
    height: number;
    skeleton: JSX.Element;
}

export const ImageFileContainer = memo(
    ({ stage, height, skeleton, ...params }: ChatFileContainerProps) => {
        const { loading, url } = useLoadCdnLink(stage, params);

        return loading ? skeleton : <Image height={height} src={url} />;
    },
    (prev, next) => prev.version === next.version
);

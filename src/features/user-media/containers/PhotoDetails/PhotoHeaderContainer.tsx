import React from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { DetailsHeader } from "features/user-moderation/components/DetailsHeader";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";
import { Alert } from "antd";

export interface PhotoHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function PhotoHeaderContainer({ url }: PhotoHeaderContainerProps) {
    const location = useLocation();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "Photo", id));

    return (
        <DetailsHeader
            id={info.data?.id ?? ""}
            createdTime={info.data?.createdTime ?? ""}
            modifiedTime={info.data?.modifiedTime ?? ""}
        />
    );
}

import React from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Alert } from "antd";

import { DetailsHeader } from "features/user-moderation/components/DetailsHeader";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";

export interface VideoClipHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function VideoClipHeaderContainer({ url }: VideoClipHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "VideoClip", id));

    return (
        <DetailsHeader
            id={info.data?.id ?? ""}
            createdTime={info.data?.createdTime ?? ""}
            modifiedTime={info.data?.modifiedTime ?? ""}
        />
    );
}

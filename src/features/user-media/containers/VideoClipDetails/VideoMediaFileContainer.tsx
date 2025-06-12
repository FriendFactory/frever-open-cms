import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert } from "antd";

import { VIDEOCLIP_DETAILS_URL } from "urls";
import { VideoMediaFileCard } from "features/user-media/components/VideoMediaFileCard";
import { userMediaFileSelector } from "features/user-media/store/reducer/userMediaFileDetailsReducer";
import { useMediaFileCdnLink } from "features/user-media/hooks/useMediaFileCdnLink";
import { UpdateEntityFileContainer } from "../UpdateEntityFileContainer";

export function VideoMediaFileContainer() {
    const location = useLocation();

    const urlMatch = VIDEOCLIP_DETAILS_URL.match(location);
    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const { stage, id } = urlMatch.params;
    const info = useSelector(userMediaFileSelector(stage, "VideoClip", id));

    const url = useMediaFileCdnLink("VideoClip", id, info.data?.files[0]?.version);
    return (
        <VideoMediaFileCard
            loading={info.loading}
            url={url}
            extra={<UpdateEntityFileContainer stage={stage} id={id} mediaFileType="VideoClip" accept="video/mp4" />}
        />
    );
}

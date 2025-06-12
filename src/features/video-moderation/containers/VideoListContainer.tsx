import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert } from "antd";

import { VIDEO_MODERATION_LIST_URL } from "urls";
import { VideoList } from "../components/VideoList";
import { videoModerationListPageSelector } from "../store";

export function VideoListContainer({}: {}) {
    const location = useLocation();
    const urlMatch = VIDEO_MODERATION_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const info = useSelector(videoModerationListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    return (
        <VideoList stage={info.stage} loading={info.loading} value={info.data} currentQuery={urlMatch.query || {}} />
    );
}

import React, { useEffect, useState, memo } from "react";

import { request } from "shared";
import { Video } from "features/video-moderation";
import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { ChatMessageVideoRef } from "../components/ChatMessage/ChatMessageVideoRef";

type VideoInfoState = { loading: boolean; videoInfo?: Video };

export interface ChatVideoThumbnailContainerProps {
    stage: string;
    videoId: number;
    height: number;
    skeleton: JSX.Element;
}

export const ChatVideoThumbnailContainer = memo(
    ({ stage, videoId, height, skeleton }: ChatVideoThumbnailContainerProps) => {
        const [{ loading, videoInfo }, setState] = useState<VideoInfoState>({
            loading: false
        });

        useEffect(() => {
            loadVideo(stage, videoId, setState);
        }, [stage, videoId]);

        return loading ? (
            skeleton
        ) : videoInfo ? (
            <ChatMessageVideoRef
                src={videoInfo.thumbnailUrl}
                height={height}
                to={VIDEO_MODERATION_DETAILS_URL.format({ stage, id: videoInfo.id })}
            />
        ) : (
            <div>{videoId}</div>
        );
    },
    (prev, next) => prev.videoId === next.videoId
);

const loadVideo = async (stage: string, videoId: number, res: (value: VideoInfoState) => void) => {
    res({ loading: true });
    try {
        const response = await request(stage)
            .assetmanager()
            .get<{ data: [Video | undefined] }>(`api/video/moderation?&$filter=id eq ${videoId}&$top=1`);

        const [videoInfo] = response.data.data;

        if (videoInfo) {
            res({ loading: false, videoInfo });
        }
    } catch (e) {
        res({ loading: false });
    }
};

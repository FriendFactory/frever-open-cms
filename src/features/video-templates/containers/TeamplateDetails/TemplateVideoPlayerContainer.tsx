import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { createCdnURLFromFiles, ThumbnailFile } from "shared";
import { TemplateVideoPlayer } from "../../components/TemplateDetails";
import { updateTemplateAction, templatePageSelector } from "../../store";

export interface TemplateVideoPlayerContainerProps {
    stage: string;
    id: number;
}

export function TemplateVideoPlayerContainer({ stage, id }: TemplateVideoPlayerContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(templatePageSelector(stage, id));

    const [videoUrl, setVideoUrl] = useState<{ url: string; count: number }>({ url: "", count: 0 });

    const updateThumbnail = (file: File) => dispatch(updateTemplateAction({ stage, id, file }));
    const updateThumbnailFromLevel = () => dispatch(updateTemplateAction({ stage, id, data: { useLevelVideo: true } }));

    useEffect(() => {
        if (info.data?.files) setVideoUrl({ url: getVideoUrl(info.data.files), count: 1 });
    }, [info.data]);

    const getVideoUrl = (files: ThumbnailFile[]) =>
        createCdnURLFromFiles({ id, files, stage, entityType: "Template", resolution: "512x512" });

    const beforeUpload = (file: File) => {
        const isMp4 = file.type === "video/mp4";
        if (!isMp4) message.error("You can only upload MP4 file!");

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) message.error("Video dmust smaller than 2MB");

        return isMp4 && isLt2M;
    };

    const handleVideoReRequest = () => {
        if (info.data) {
            const newVideoUrl = getVideoUrl(info.data?.files);
            setTimeout(() => setVideoUrl({ url: newVideoUrl, count: videoUrl.count + 1 }), 4000);
        }
    };

    return (
        <TemplateVideoPlayer
            loading={info.loading && !info.data}
            videoUrl={videoUrl}
            updateThumbnail={updateThumbnail}
            beforeUpload={beforeUpload}
            videoReRequest={handleVideoReRequest}
            updateThumbnailFromLevel={updateThumbnailFromLevel}
        />
    );
}

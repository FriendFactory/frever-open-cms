import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

import { createCdnURLFromFiles, ThumbnailFile } from "shared";
import { TaskVideoPlayer } from "../components/TaskVideoPlayer";
import { taskDetailsPageSelector } from "../store/reducer/taskDetails.reducer";
import { updateTaskAction, uploadCustomTaskThumbAction } from "../store/actions";

export interface TaskVideoPlayerContainerProps {
    stage: string;
    id: number;
}

export function TaskVideoPlayerContainer({ stage, id }: TaskVideoPlayerContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(taskDetailsPageSelector(stage, id));

    const [videoUrl, setVideoUrl] = useState<{ url: string; count: number }>({ url: "", count: 0 });

    useEffect(() => {
        if (info.data?.files) {
            const newVideoUrl = getVideoUrl(stage, id, info.data.files);
            setVideoUrl({ url: newVideoUrl, count: 1 });
        }
    }, [info.data]);

    const beforeUpload = (file: File) => {
        const isMp4 = file.type === "video/mp4";
        if (!isMp4) {
            message.error("You can only upload MP4 file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Video must smaller than 2MB");
        }
        return isMp4 && isLt2M;
    };

    const updateThumbnailFromLevel = () =>
        dispatch(updateTaskAction({ stage, id, data: { useLevelVideo: true } as any }));

    const handleVideoReRequest = () => {
        if (info.data && videoUrl.count < 5) {
            const newVideoUrl = getVideoUrl(stage, id, info.data.files);
            setTimeout(() => setVideoUrl({ url: newVideoUrl, count: videoUrl.count + 1 }), 4000);
        }
    };

    const uploadCustomVideo = (data: any) =>
        dispatch(
            uploadCustomTaskThumbAction({
                stage,
                id,
                data
            })
        );

    return (
        <TaskVideoPlayer
            loading={info.loading && !info.data}
            videoUrl={videoUrl}
            beforeUpload={beforeUpload}
            updateThumbnailFromLevel={updateThumbnailFromLevel}
            handleVideoReRequest={handleVideoReRequest}
            uploadCustomVideo={uploadCustomVideo}
        />
    );
}

function getVideoUrl(stage: string, id: number, files: ThumbnailFile[]) {
    return createCdnURLFromFiles({
        id,
        stage,
        files,
        entityType: "SchoolTask",
        resolution: "512x512"
    });
}

import React from "react";
import { Col, Result, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { LoadingContainer, useExtraDataBundle } from "shared";
import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { VideoDetailsInfo } from "../components/VideoDetailsInfo";
import { VideoPlayer } from "../components/VideoPlayer";
import { executeVideoCommandAction, patchVideoCommandAction, setVideoSoftDeleteAction } from "../store/actions";
import { videoDetailsSelector } from "../store";
import { Video, VideoCommandType, VideoPatchRequest } from "../services";

export interface VideoDetailsContainerProps {}

export function VideoDetailsContainer({}: VideoDetailsContainerProps) {
    const location = useLocation();
    const urlMatch = VIDEO_MODERATION_DETAILS_URL.match(location);
    const dispatch = useDispatch();
    const extraData = useExtraDataBundle(["Country", "Language"]);

    if (!urlMatch.isMatched) return null;

    const videoInfo = useSelector(videoDetailsSelector(urlMatch.params.stage, urlMatch.params.id));

    const handleSetSoftDelete = (videoId: number, isDeleted: boolean, includeRemixes: boolean) =>
        dispatch(
            setVideoSoftDeleteAction({
                stage: urlMatch.params.stage,
                isDeleted,
                videoId,
                includeRemixes
            })
        );

    const executeVideoCommand = (command: VideoCommandType, newVideoInfo?: Video) =>
        videoInfo.data?.video &&
        dispatch(
            executeVideoCommandAction({
                stage: urlMatch.params.stage,
                video: { ...videoInfo.data.video, ...newVideoInfo },
                command
            })
        );

    const patchVideo = (data: VideoPatchRequest) => {
        dispatch(patchVideoCommandAction({ stage: urlMatch.params.stage, videoId: urlMatch.params.id, data }));
    };

    if (videoInfo.loading && !videoInfo.data) return <LoadingContainer loading />;

    if (!videoInfo.data) return <Result status="404" title="Video is not found or not accessible" />;

    return (
        <Row gutter={[24, 24]} justify="center">
            <Col flex="0 0 445px">
                <VideoPlayer
                    loading={videoInfo.loading && !videoInfo.data.media?.singleFileVideoUrl}
                    media={videoInfo.data.media}
                />
            </Col>
            <Col flex="1 1 350px">
                <VideoDetailsInfo
                    video={videoInfo.data.video}
                    extraData={extraData}
                    remixes={videoInfo.data.remixes}
                    onSetSoftDelete={handleSetSoftDelete}
                    onExecuteVideoCommand={executeVideoCommand}
                    onPatchVideo={patchVideo}
                />
            </Col>
        </Row>
    );
}

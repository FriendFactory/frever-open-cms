import React from "react";
import { Col, Row } from "antd";
import { Gutter } from "antd/lib/grid/row";

import { ExtraDataBundleResult } from "shared/store";
import { Video, VideoCommandType, VideoPatchRequest } from "../services";
import {
    VideoDetailsAuthorInfo,
    VideoDetailsInformation,
    VideoDetailsMedia,
    VideoDetailsRemixes,
    VideoDetailsRemixFrom,
    VideoDetailsStatistics
} from "./VideoDetails";

const gutter: [Gutter, Gutter] = [16, 16];

export interface VideoDetailsInfoProps {
    video: Video;
    remixes?: Video[];
    extraData: ExtraDataBundleResult<"Country" | "Language">;
    onSetSoftDelete: (videoId: number, isDeleted: boolean, includeRemixes: boolean) => void;
    onExecuteVideoCommand: (command: VideoCommandType) => void;
    onPatchVideo: (data: VideoPatchRequest) => void;
}

export function VideoDetailsInfo({
    video,
    remixes,
    extraData,
    onSetSoftDelete,
    onExecuteVideoCommand,
    onPatchVideo
}: VideoDetailsInfoProps) {
    return (
        <Row gutter={gutter} justify="start" align="stretch">
            <Col span={24}>
                <VideoDetailsInformation video={video} extraData={extraData} />
            </Col>

            <Col span={24}>
                <VideoDetailsAuthorInfo
                    video={video}
                    remixes={remixes}
                    onExecuteVideoCommand={onExecuteVideoCommand}
                    onSetSoftDelete={onSetSoftDelete}
                    onPatchVideo={onPatchVideo}
                />
            </Col>

            <Col span={24}>
                <VideoDetailsStatistics kpi={video.kpi} />
            </Col>

            {(video.songs.length > 0 || video.userSounds.length > 0) && (
                <Col span={24}>
                    <VideoDetailsMedia songs={video.songs} userSounds={video.userSounds} />
                </Col>
            )}

            {video.remixedFromVideoId && (
                <Col span={24}>
                    <VideoDetailsRemixFrom remixFromVideoId={video.remixedFromVideoId} />
                </Col>
            )}

            {!!remixes?.length && (
                <Col span={24}>
                    <VideoDetailsRemixes remixes={remixes} />
                </Col>
            )}
        </Row>
    );
}

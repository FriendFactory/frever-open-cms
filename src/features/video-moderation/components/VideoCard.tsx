import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { theme } from "antd";
import { DeleteOutlined, LockOutlined } from "@ant-design/icons";

import { VIDEO_MODERATION_DETAILS_URL } from "urls";
import { GetVideoListParams, Video, VideoAccess } from "../services";
import { videoModerationListLoadAction, videoModerationListPageSelector } from "../store";

interface VideoCardProps {
    value: Video | number;
    stage: string;
    className?: string;
    currentQuery?: GetVideoListParams;
    showVideoInfo?: boolean;
    target?: React.HTMLAttributeAnchorTarget;
}

export const VideoCard = ({ value, stage, className, currentQuery, target, showVideoInfo = true }: VideoCardProps) => {
    const dispatch = useDispatch();
    const { token } = theme.useToken();

    const info = useSelector(videoModerationListPageSelector(stage, { video: value.toString() }));

    useEffect(() => {
        if (typeof value === "number" || typeof value === "string")
            dispatch(videoModerationListLoadAction({ stage, params: { video: value.toString() } }));
    }, [value]);

    const video = typeof value === "object" ? value : info.data?.[0];
    const videoRef = useRef<HTMLVideoElement | null>();
    const onSetRef = useCallback((el: HTMLVideoElement | null) => (videoRef.current = el), [videoRef]);

    const handleMouseOver = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play();
            videoRef.current.playbackRate = 4;
        }
    }, [videoRef]);

    const handleMouseOut = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [videoRef]);

    if (!video) return null;

    return (
        <div className={className}>
            <VideoCardInner>
                <VideoCardContent
                    target={target}
                    to={VIDEO_MODERATION_DETAILS_URL.format(
                        {
                            stage,
                            id: video.id
                        },
                        currentQuery
                    )}>
                    <Video
                        background={video.isDeleted ? token.colorFillContent : "none"}
                        src={video.thumbnailUrl}
                        loop
                        muted
                        ref={onSetRef}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    />
                    {showVideoInfo && (
                        <VideoCardInfoContainer textColor={token.colorText} fontSizeSm={token.fontSizeSM}>
                            <VideoCardInfoContainerItemTop backgroundColor={token.colorBgElevated}>
                                <span>{`ID: ${video.id}`}</span>
                                <span>
                                    {VideoAccess[video.access] === "Public" ? null : <LockOutlined />}
                                    {video.isDeleted ? <DeleteOutlined /> : null}
                                </span>
                            </VideoCardInfoContainerItemTop>
                            <VideoCardInfoContainerItemBottom>
                                <VideoCardInfoDuration backgroundColor={token.colorBgElevated}>
                                    {dayjs.duration(video.duration, "seconds").format("m:s")}
                                </VideoCardInfoDuration>
                                <VideoCardInfoDuration backgroundColor={token.colorBgElevated}>
                                    {dayjs.utc(video.createdTime).format("D MMM YY")}
                                </VideoCardInfoDuration>
                            </VideoCardInfoContainerItemBottom>
                        </VideoCardInfoContainer>
                    )}
                </VideoCardContent>
            </VideoCardInner>
        </div>
    );
};

const VideoCardInner = styled.div`
    width: 100%;
    padding-top: calc(16 / 9 * 100%);
    position: relative;
`;

const VideoCardContent = styled(Link)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const Video = styled.video<{ background: string }>`
    width: 100%;
    height: auto;
    object-fit: cover;
    background: ${(props) => props.background};
    aspect-ratio: 9/16;
`;

const VideoCardInfoContainer = styled.span<{ textColor: string; fontSizeSm: number }>`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;
    color: ${(props) => props.textColor};
    font-size: ${(props) => props.fontSizeSm}px;
`;

const VideoCardInfoContainerItemBottom = styled.span`
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: space-between;
    margin: 0.3em;
`;

const VideoCardInfoContainerItemTop = styled.span<{ backgroundColor: string }>`
    padding: 0.3em;
    background: ${(props) => props.backgroundColor};
    opacity: 0.9;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`;

const VideoCardInfoDuration = styled.span<{ backgroundColor: string }>`
    line-height: 1em;
    background-color: ${(props) => props.backgroundColor};
    border-radius: 0.3em;
    padding: 0.3em;
`;

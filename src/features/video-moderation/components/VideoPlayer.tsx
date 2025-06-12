import React, { useCallback, useRef } from "react";
import { theme } from "antd";
import styled from "styled-components";

import { LoadingContainer } from "shared";
import { VideoMediaInfo } from "../services";
import { useKeyPress } from "shared/hooks/useKeyPress";

export interface VideoPlayerProps {
    media?: VideoMediaInfo;
    loading: boolean;
}

export function VideoPlayer({ media, loading }: VideoPlayerProps) {
    const { token } = theme.useToken();

    const videoRef = useRef<HTMLVideoElement | null>();
    const onSetRef = useCallback((el: HTMLVideoElement | null) => (videoRef.current = el), [videoRef]);

    const handlePlayPauseVideo = () => {
        if (
            videoRef.current !== document.activeElement &&
            document.activeElement?.tagName !== "INPUT" &&
            !document.querySelectorAll(".ant-modal-root").length
        ) {
            videoRef.current?.focus();
            videoRef.current?.paused ? videoRef.current.play() : videoRef.current?.pause();
        }
    };

    useKeyPress([" "], handlePlayPauseVideo);

    return loading ? (
        <LoadingContainer loading />
    ) : (
        <VideoPlayerStyled
            borderRadius={token.borderRadiusLG}
            screenMDMax={token.screenMDMax}
            ref={onSetRef}
            src={media?.singleFileVideoUrl}
            controls
        />
    );
}

const VideoPlayerStyled = styled.video<{ borderRadius: number; screenMDMax: number }>`
    width: 100%;
    height: auto;
    max-height: 800px;
    aspect-ratio: 9/16;
    background-color: black;
    border-radius: ${(props) => props.borderRadius}px;

    @media (max-width: ${(props) => props.screenMDMax}px) {
        display: block;
        margin: 0 auto;
        max-width: 260px !important;
    }
`;

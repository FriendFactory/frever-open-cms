import React, { useCallback, useRef } from "react";
import styled from "styled-components";

export interface TaskVideoCardProps {
    thumbnailUrl: string;
    width?: number | "auto";
    height?: number | "auto";
}

export function TaskVideoCard({ thumbnailUrl, height, width }: TaskVideoCardProps) {
    const videoRef = useRef<HTMLVideoElement | null>();
    const onSetRef = useCallback((el: HTMLVideoElement | null) => (videoRef.current = el), [videoRef]);

    const handleMouseOver = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [videoRef]);

    const handleMouseOut = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [videoRef]);

    return (
        <VideoPlayer
            width={width}
            height={height}
            src={thumbnailUrl}
            loop
            muted
            ref={onSetRef}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        />
    );
}

const VideoPlayer = styled.video<{ height?: number | "auto"; width?: number | "auto" }>`
    height: ${({ height }) => (height ? height + "px" : "140px")};
    width: ${({ width }) => (width ? width + "px" : "90px")};
    object-fit: cover;
`;

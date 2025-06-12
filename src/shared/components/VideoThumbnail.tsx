import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import { theme } from "antd";

interface VideoCardProps {
    date?: string;
    duration?: string | 0;
    isDeleted?: boolean;
    src: string;
    topInfo?: React.ReactNode[];
    onClick?: () => void;
}

export function VideoCard({ onClick, date, isDeleted, topInfo, duration, src }: VideoCardProps) {
    const { token } = theme.useToken();

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

    return (
        <VideoCardInner pointer={!!onClick} onClick={onClick}>
            <VideoCardContent>
                <Video
                    src={src}
                    background={isDeleted ? token.colorFillContent : "none"}
                    loop
                    muted
                    ref={onSetRef}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
                <VideoCardInfoContainer textColor={token.colorText} fontSizeSm={token.fontSizeSM}>
                    <VideoCardInfoContainerItemTop backgroundColor={token.colorBgElevated}>
                        {topInfo}
                    </VideoCardInfoContainerItemTop>
                    <VideoCardInfoContainerItemBottom>
                        {duration && (
                            <VideoCardInfoDuration backgroundColor={token.colorBgElevated}>
                                {duration}
                            </VideoCardInfoDuration>
                        )}
                        {date && (
                            <VideoCardInfoDuration backgroundColor={token.colorBgElevated}>
                                {date}
                            </VideoCardInfoDuration>
                        )}
                    </VideoCardInfoContainerItemBottom>
                </VideoCardInfoContainer>
            </VideoCardContent>
        </VideoCardInner>
    );
}

const VideoCardInner = styled.div<{ pointer: boolean }>`
    width: 100%;
    padding-top: calc(16 / 9 * 100%);
    position: relative;
    cursor: ${(props) => (props.pointer ? "pointer" : "inherit")};
`;

const VideoCardContent = styled.div`
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

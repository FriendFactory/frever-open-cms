import { Tag } from "antd";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export interface ChatMessageVideoRefProps {
    src: string;
    to: string;
    width?: number;
    height?: number;
}

export function ChatMessageVideoRef({ src, height, width, to }: ChatMessageVideoRefProps) {
    const videoRef = useRef<HTMLVideoElement | null>();
    const onSetRef = (el: HTMLVideoElement | null) => (videoRef.current = el);

    const handleMouseOver = () => videoRef.current && videoRef.current.play();
    const handleMouseOut = () => videoRef.current && videoRef.current.pause();

    return (
        <Link to={to}>
            <Wrapper>
                <TagInner>
                    <Tag color="blue">Linked Video</Tag>
                </TagInner>
                <VideoPlayer
                    width={width}
                    height={height}
                    src={src}
                    loop
                    muted
                    ref={onSetRef}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            </Wrapper>
        </Link>
    );
}

const VideoPlayer = styled.video<{ height?: number; width?: number }>`
    height: ${({ height }) => (height ? height + "px" : "auto")};
    width: ${({ width }) => (width ? width + "px" : "auto")};
    object-fit: cover;
    aspect-ratio: 9/16;
`;

const Wrapper = styled.div`
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

    &:hover {
        transform: scale(1.1);
        transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`;

const TagInner = styled.div`
    position: absolute;
    top: 2px;
    left: -4px;
    opacity: 0.9;
    transform: scale(0.8);
`;

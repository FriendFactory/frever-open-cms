import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    DownloadOutlined,
    MoreOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    SoundOutlined
} from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Row, Slider, SliderSingleProps, theme, Tooltip } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import styled from "styled-components";

const PLAYER_COMPACT_WIDTH = 355;

export interface AudioPlayerProps {
    src: string;
    extraMoreOptions?: ItemType[];
    forceStop?: boolean;
    onPlay?: () => void;
}

export const AudioPlayer = ({ src, extraMoreOptions = [], forceStop, onPlay }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const [playerWidth, setPlayerWidth] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const isCompact = playerWidth <= PLAYER_COMPACT_WIDTH;

    useEffect(() => {
        if (forceStop) {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    }, [forceStop]);

    useEffect(() => {
        isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current && (audioRef.current.volume = volume / 100);
    }, [volume]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => setPlayerWidth(event[0].contentBoxSize[0].inlineSize));
        if (playerRef.current) {
            resizeObserver.observe(playerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);

    const onLoadedMetadata = () => audioRef.current?.duration && setDuration(audioRef.current.duration);

    const onTimeUpdate = () => audioRef.current?.currentTime && setCurrentTime(audioRef.current.currentTime);

    const handleChangeSlider = (time: number) => {
        if (audioRef.current?.currentTime !== undefined) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handleTogglePlay = () => setIsPlaying((prev) => !prev);

    const handleClickVolume = () => setIsVolumeSliderVisible(!isVolumeSliderVisible);

    const download = () => {
        let a = document.createElement("a");
        a.href = src;
        a.target = "_blank";
        a.download = "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const menuItemsMore: ItemType[] = [
        {
            label: <a>Download</a>,
            key: "download",
            icon: <DownloadOutlined />,
            onClick: download
        },
        ...extraMoreOptions
    ];

    return (
        <Player ref={playerRef} playerWidth={playerWidth} onMouseDown={(e) => e.stopPropagation()}>
            <Row gutter={{ xs: 4, sm: 6, md: 8 }} justify="center" align="middle">
                <audio
                    ref={audioRef}
                    src={src}
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                    onPlay={onPlay}
                    onEnded={() => setIsPlaying(false)}
                />

                <Col order={1}>
                    <Button
                        type="text"
                        shape="circle"
                        size="large"
                        icon={
                            <Tooltip title={isPlaying ? "Pause" : "Play"}>
                                {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                            </Tooltip>
                        }
                        onClick={handleTogglePlay}
                    />
                </Col>

                <Col flex="auto" order={isCompact ? 5 : 2}>
                    <Row gutter={8} align="middle" wrap={false}>
                        <Col flex="0 0 40px" style={{ whiteSpace: "nowrap" }}>
                            {formatTime(currentTime)}
                        </Col>

                        <Col flex="auto">
                            <SliderPlayer
                                style={{ minWidth: !isCompact && isVolumeSliderVisible ? "auto" : "100px" }}
                                defaultValue={0}
                                value={currentTime}
                                min={0}
                                max={duration}
                                onChange={handleChangeSlider}
                                step={0.05}
                                tooltip={{ formatter: (value) => formatTime(value) }}
                            />
                        </Col>

                        <Col flex="0 0 40px" style={{ whiteSpace: "nowrap" }}>
                            {formatTime(duration)}
                        </Col>
                    </Row>
                </Col>
                <Col
                    order={3}
                    onMouseEnter={() => setIsVolumeSliderVisible(true)}
                    onMouseLeave={() => setIsVolumeSliderVisible(false)}>
                    <Row gutter={8} align="middle" wrap={false}>
                        {isVolumeSliderVisible && (
                            <Col>
                                <SliderPlayer
                                    defaultValue={volume}
                                    value={volume}
                                    min={0}
                                    max={100}
                                    onChange={setVolume}
                                    style={{ width: 100 }}
                                />
                            </Col>
                        )}
                        <Col>
                            <Button onClick={handleClickVolume} type="text" shape="circle" icon={<SoundOutlined />} />
                        </Col>
                    </Row>
                </Col>
                <Col order={4} style={{ display: isVolumeSliderVisible ? "none" : "initial" }}>
                    <Dropdown menu={{ items: menuItemsMore }}>
                        <Button type="text" shape="circle" icon={<MoreOutlined />} />
                    </Dropdown>
                </Col>
            </Row>
        </Player>
    );
};

const SliderPlayer = (props: SliderSingleProps) => {
    const { max, onChange } = props;
    const [sliderActive, setSliderActive] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    const onMouseUp = () => setSliderActive(false);
    const onMouseDown = () => setSliderActive(true);

    const onMouseMove = useCallback(
        (e: any) => {
            const rect = divRef.current?.getBoundingClientRect();

            if (rect && max && onChange) {
                const percentPositionX = (Math.floor(e.clientX - rect.left) / rect.width) * 100;
                let sliderValue = (percentPositionX * max) / 100;

                if (sliderValue < 0) sliderValue = 0;
                if (sliderValue > max) sliderValue = max;
                onChange(sliderValue);
            }
        },
        [max]
    );

    useEffect(() => {
        if (sliderActive) {
            window.onmouseup = onMouseUp;
            window.onmousemove = onMouseMove;
        }
        return () => {
            window.onmouseup = null;
            window.onmousemove = null;
        };
    }, [sliderActive]);

    return (
        <SliderWrapper ref={divRef} onMouseDown={onMouseDown} onClick={onMouseMove}>
            <SliderStyled {...props} />
        </SliderWrapper>
    );
};

const formatTime = (time?: number) => {
    if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
};

const Player = styled(Card)<{ playerWidth: number }>`
    flex: 1 1 0%;
    border-radius: ${(props) => (props.playerWidth > PLAYER_COMPACT_WIDTH ? 50 : 8)}px;
    .ant-card-body {
        padding: 8px 16px;
    }
`;

const SliderWrapper = styled.div`
    padding: 11px 0;
    cursor: pointer;
`;

const SliderStyled = styled(Slider)`
    margin-top: 0;
    margin-bottom: 0;

    .ant-slider-handle {
        opacity: 0;

        &:hover {
            opacity: 1;
            scale: 0.7;
        }
    }

    .ant-slider-track {
        background-color: ${() => theme.useToken().token.colorPrimary};
    }
`;

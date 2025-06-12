import React from "react";
import { Empty, Spin } from "antd";
import styled from "styled-components";

import { GetVideoListParams, Video } from "../services";
import { VideoCard } from "./VideoCard";
import { Loading3QuartersOutlined } from "@ant-design/icons";

export interface VideoListProps {
    loading: boolean;
    stage: string;
    value: Video[];
    currentQuery: GetVideoListParams;
}

export function VideoList({ stage, value, loading, currentQuery }: VideoListProps) {
    if (!loading && !value.length) return <Empty />;

    return (
        <Spin
            spinning={loading}
            size="large"
            indicator={<Loading3QuartersOutlined spin />}
            tip={value.length ? "Updating..." : "Loading..."}>
            <VideoListStyled>
                {value.map((v) => (
                    <VideoCard key={v.id} stage={stage} value={v} className="item" currentQuery={currentQuery} />
                ))}
            </VideoListStyled>
        </Spin>
    );
}

const VideoListStyled = styled.div`
    min-height: 75vh;
    position: relative;
    display: grid;
    grid-gap: 0.2em;

    grid-template-columns: repeat(12, 1fr);

    @media (max-width: 1699px) {
        grid-template-columns: repeat(10, 1fr);
    }

    @media (max-width: 1499px) {
        grid-template-columns: repeat(8, 1fr);
    }

    @media (max-width: 1199px) {
        grid-template-columns: repeat(6, 1fr);
    }

    @media (max-width: 767px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 575px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import { VideoFilterFields, VideoFilterForm } from "features/video-moderation/components/VideoFilterForm";
import { videoModerationListLoadAction, videoModerationListPageSelector } from "features/video-moderation/store";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { LoadingContainer } from "shared";
import { toFormValues, toUrlParams } from "features/video-moderation/containers/VideoFilterFormContainer";
import { DEFAULT_VIDEO_PAGE_SIZE } from "urls";
import { Video } from "features/video-moderation/services";
import { VideoCard } from "shared/components/VideoThumbnail";

interface SearchForVideoModalContainerProps {
    stage: string;
    btnText: React.ReactNode;
    onVideoClick: (video: Video) => void;
}

export function SearchForVideoModalContainer({ stage, btnText, onVideoClick }: SearchForVideoModalContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        handleOnChange({});
    }, []);

    const videoList = useSelector(videoModerationListPageSelector(stage, searchParams));

    const handleOnChange = (newValues: VideoFilterFields) => {
        const params = { ...toUrlParams(newValues), skip: 0 };
        dispatch(videoModerationListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_VIDEO_PAGE_SIZE;
        const params = { ...toUrlParams(searchParams), skip };
        dispatch(videoModerationListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    return (
        <>
            <a onClick={() => setIsModalOpen(true)}>{btnText}</a>
            <ScrollableModal
                title="Search for videos (Click on a video to select)"
                open={isModalOpen}
                width={1360}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={videoList.total}
                        current={videoList.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <VideoFilterForm value={toFormValues(searchParams)} onChange={handleOnChange} />
                {videoList.loading && <LoadingContainer loading />}

                <VideoListStyled>
                    {videoList.data.map((video) => {
                        return (
                            <VideoCard
                                key={video.id}
                                topInfo={[
                                    <span key="id">{video.id}</span>,
                                    <span key="isDeleted">{video.isDeleted && <DeleteOutlined />}</span>
                                ]}
                                isDeleted={video.isDeleted}
                                date={video.createdTime && dayjs.utc(video.createdTime).format("DD MMM YY")}
                                duration={video.duration && dayjs.duration(video.duration, "seconds").format("m:s")}
                                src={video.thumbnailUrl}
                                onClick={() => {
                                    onVideoClick(video);
                                    setIsModalOpen(false);
                                }}
                            />
                        );
                    })}
                </VideoListStyled>
            </ScrollableModal>
        </>
    );
}

export const VideoListStyled = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: 0.5em;
`;

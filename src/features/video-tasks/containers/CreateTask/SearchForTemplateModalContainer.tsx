import { message, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { createCdnURLFromFiles, LoadingContainer } from "shared";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { templateListPageSelector, templateListLoadAction } from "features/video-templates/store";
import { toFormValues, toUrlParams } from "features/video-templates/containers/TemplateList/TemplFilterContainer";
import { TemplateListFilterForm, TemplateFilterFormParams } from "features/video-templates/components/TemplateList";
import { DEFAULT_TEMPLATE_LIST_PAGE_SIZE } from "urls";
import { Template } from "features/video-templates/services";
import { VideoListStyled } from "../../../video-moderation/containers/SearchForVideoModalContainer";
import { VideoCard } from "shared/components/VideoThumbnail";

interface SearchForTemplateModalContainerProps {
    stage: string;
    btnText: string;
    onVideoClick: (template: Template) => void;
}

export function SearchForTemplateModalContainer({
    stage,
    btnText,
    onVideoClick
}: SearchForTemplateModalContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({});

    useEffect(() => {
        handleOnChange({});
    }, []);

    const templateList = useSelector(templateListPageSelector(stage, searchParams));

    const handleOnChange = (newValues: TemplateFilterFormParams) => {
        const params = { ...toUrlParams(newValues), skip: 0 };
        dispatch(templateListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_TEMPLATE_LIST_PAGE_SIZE;
        const params = { ...toUrlParams(searchParams), skip };
        dispatch(templateListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    return (
        <>
            <a onClick={() => setIsModalOpen(true)}>{btnText}</a>
            <ScrollableModal
                title="Search for templates (Click on a template to select)"
                open={isModalOpen}
                width={1360}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={templateList.total}
                        current={templateList.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <TemplateListFilterForm values={toFormValues(searchParams)} onChange={handleOnChange} />
                {templateList.loading && <LoadingContainer loading />}
                <VideoListStyled>
                    {templateList.data?.map((video) => {
                        return (
                            <VideoCard
                                key={video.id}
                                topInfo={[
                                    <span key="name">{video.title}</span>,
                                    <span key="isDeleted">{video.isDeleted && <DeleteOutlined />}</span>
                                ]}
                                isDeleted={video.isDeleted}
                                date={video.createdTime && dayjs.utc(video.createdTime).format("DD MMM YY")}
                                src={createCdnURLFromFiles({
                                    stage,
                                    id: video.id,
                                    resolution: "512x512",
                                    entityType: "Template",
                                    files: video.files
                                })}
                                onClick={() => {
                                    video.id
                                        ? onVideoClick(video)
                                        : message.error(
                                              "The selected video doesn't contain a Level. Try to select another one"
                                          );
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

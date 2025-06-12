import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";

import { AudioPlayer } from "shared";
import { TemplateForm } from "../../components/TemplateDetails";
import { updateTemplateAction, templatePageSelector, deleteTemplatesAction } from "../../store";
import { TemplateInfo } from "features/video-templates/components/TemplateDetails/TemplateInfo";
import { Template } from "features/video-templates/services";

export interface TemplateInfoContainerProps {
    stage: string;
    id: number;
}

export function TemplateInfoContainer({ stage, id }: TemplateInfoContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(templatePageSelector(stage, id));

    const handleOnSubmit = (data: Partial<Template>) => dispatch(updateTemplateAction({ stage, id, data }));

    const handleOnClickDelete = () =>
        info.data &&
        dispatch(deleteTemplatesAction({ stage, ids: [id], command: info.data.isDeleted ? "undelete" : "delete" }));

    return (
        <Space direction="vertical" size="large">
            {info?.eventSoundURL && <AudioPlayer src={info.eventSoundURL} />}
            <TemplateInfo
                stage={stage}
                loading={!info.data && info.loading}
                template={info.data}
                onClickDelete={handleOnClickDelete}
            />
            <TemplateForm
                stage={stage}
                loading={!info.data && info.loading}
                data={info.data}
                onSubmit={handleOnSubmit}
            />
        </Space>
    );
}

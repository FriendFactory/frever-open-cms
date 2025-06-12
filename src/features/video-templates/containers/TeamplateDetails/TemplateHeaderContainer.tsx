import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { TemplateHeader } from "../../components/TemplateDetails";
import { templatePageSelector } from "features/video-templates/store";

export interface TemplateHeaderContainerProps {
    stage: string;
    id: number;
}

export function TemplateHeaderContainer({ stage, id }: TemplateHeaderContainerProps) {
    const { data } = useSelector(templatePageSelector(stage, id));

    const createdTime = data ? dayjs.utc(data.createdTime).format("DD MMM YYYY HH:mm") : "...";
    const modifiedTime = data ? dayjs.utc(data.modifiedTime).format("DD MMM YYYY HH:mm") : "...";

    return <TemplateHeader id={id} title={data?.title ?? ""} createdTime={createdTime} modifiedTime={modifiedTime} />;
}

import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { emotionsByIdSelector } from "../store/reducer/emotionsListReducer";

interface DetailsPageHeaderContainerProps {
    stage: string;
    id: number;
}

export function DetailsPageHeaderContainer({ stage, id }: DetailsPageHeaderContainerProps) {
    const info = useSelector(emotionsByIdSelector(stage, id));

    return (
        <PageHeader
            title={info.data?.name ?? "..."}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {id}
                </Typography.Title>
            }
        />
    );
}

import React from "react";
import { Space, Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { backgroundAIInfoByIdSelector } from "features/vme-backgrounds/store/reducer/BackgroundAI/backgroundAIListReducer";
import { BackgroundAIPreviewModalContainer } from "./BackgroundAIPreviewModalContainer";

export interface BackgroundAIDetailsHeaderProps {
    stage: string;
    id: number;
}

export function BackgroundAIDetailsHeader({ stage, id }: BackgroundAIDetailsHeaderProps) {
    const { data, loading } = useSelector(backgroundAIInfoByIdSelector(stage, id));

    return (
        <PageHeader
            title={data?.name ? data?.name : loading ? "..." : "??"}
            withBackButton
            extra={
                <Space>
                    <BackgroundAIPreviewModalContainer background={data} loading={loading} />
                    <Typography.Title level={3} type="secondary">
                        ID: {data?.id}
                    </Typography.Title>
                </Space>
            }
        />
    );
}

import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { watermarkInfoByIdSelector } from "../store/reducer";

interface WatermarkDetailsHeaderProps {
    stage: string;
    id: number;
}

export function WatermarkDetailsHeader({ stage, id }: WatermarkDetailsHeaderProps) {
    const { data, loading } = useSelector(watermarkInfoByIdSelector(stage, id));

    return (
        <PageHeader
            title={data?.name ? data?.name : loading ? "..." : "??"}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {data?.id}
                </Typography.Title>
            }
        />
    );
}

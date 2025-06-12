import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { vmeBackgroundInfoByIdSelector } from "../store/reducer/vmeBackgroundListReducer";

export interface VMEBackgroundDetailsHeaderProps {
    stage: string;
    id: number;
}

export function VMEBackgroundDetailsHeader({ stage, id }: VMEBackgroundDetailsHeaderProps) {
    const { data, loading } = useSelector(vmeBackgroundInfoByIdSelector(stage, id));

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

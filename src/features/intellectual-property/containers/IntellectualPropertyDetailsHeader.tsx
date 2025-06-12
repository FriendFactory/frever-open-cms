import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { intellectualPropertyInfoByIdSelector } from "../store/reducer";

interface IntellectualPropertyDetailsHeaderProps {
    stage: string;
    id: number;
}

export function IntellectualPropertyDetailsHeader({ stage, id }: IntellectualPropertyDetailsHeaderProps) {
    const { data, loading } = useSelector(intellectualPropertyInfoByIdSelector(stage, id));

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

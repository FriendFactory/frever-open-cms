import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { createPageInfoByIdSelector } from "../store/reducer";

interface CreatePageDetailsHeaderProps {
    stage: string;
    id: number;
}

export function CreatePageDetailsHeader({ stage, id }: CreatePageDetailsHeaderProps) {
    const { data, loading } = useSelector(createPageInfoByIdSelector(stage, id));

    return (
        <PageHeader
            title={data?.title ? data?.title : loading ? "..." : "??"}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {data?.id}
                </Typography.Title>
            }
        />
    );
}

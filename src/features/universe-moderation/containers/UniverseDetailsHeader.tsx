import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { universeInfoByIdSelector } from "../store/reducer";

interface UniverseDetailsHeaderProps {
    stage: string;
    id: number;
}

export function UniverseDetailsHeader({ stage, id }: UniverseDetailsHeaderProps) {
    const { data, loading } = useSelector(universeInfoByIdSelector(stage, id));

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

import { Badge, Typography } from "antd";
import { geoClustersDetailsPageSelector } from "features/categories-moderation/store/reducer/geoClusters/geoClustersDetailsPageReducer";
import React from "react";
import { useSelector } from "react-redux";
import { PageHeader } from "shared";

export interface HeaderContainerProps {
    stage: string;
    id: number;
}

export function GeoClusterHeaderContainer({ stage, id }: HeaderContainerProps) {
    const info = useSelector(geoClustersDetailsPageSelector(stage, id));
    return (
        <PageHeader
            title={info.data?.title ?? "..."}
            withBackButton
            extra={
                info.data ? (
                    <Typography.Title level={4}>
                        <Badge color={info.data?.isActive ? "blue" : "red"} />
                        &nbsp;&nbsp;
                        {info.data?.isActive ? "Active" : "Inactive"}
                    </Typography.Title>
                ) : (
                    "..."
                )
            }
        />
    );
}

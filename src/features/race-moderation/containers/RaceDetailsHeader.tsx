import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { raceInfoByIdSelector } from "../store/reducer";

interface RaceDetailsHeaderProps {
    stage: string;
    id: number;
}

export function RaceDetailsHeader({ stage, id }: RaceDetailsHeaderProps) {
    const { data, loading } = useSelector(raceInfoByIdSelector(stage, id));

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

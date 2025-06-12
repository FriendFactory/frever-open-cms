import React from "react";
import { Typography } from "antd";
import { useSelector } from "react-redux";

import { PageHeader } from "shared";
import { themeCollectionInfoByIdSelector } from "../store/reducer/collectionListReducer";

export interface ThemeCollectionsDetailsHeaderProps {
    stage: string;
    id: number;
}

export function ThemeCollectionsDetailsHeader({ stage, id }: ThemeCollectionsDetailsHeaderProps) {
    const { data, loading } = useSelector(themeCollectionInfoByIdSelector(stage, id));

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

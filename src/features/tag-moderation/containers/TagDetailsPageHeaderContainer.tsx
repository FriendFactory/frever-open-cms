import { Typography } from "antd";
import React from "react";

import { PageHeader } from "shared/components/PageHeader";
import { useExtraData } from "shared/hooks/useExtraData";

export interface TagDetailsPageHeaderContainerProps {
    stage: string;
    id: number;
}

export function TagDetailsPageHeaderContainer({ stage, id }: TagDetailsPageHeaderContainerProps) {
    const info = useExtraData({ stage, name: "Tag" });

    const data = info.data?.find((el) => el.id.toString() === id.toString());

    return (
        <PageHeader
            title={data?.name ?? ""}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {data?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}

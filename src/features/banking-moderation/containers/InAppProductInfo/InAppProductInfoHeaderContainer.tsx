import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";

import { inAppProductInfoPageSelector } from "features/banking-moderation/store/reducer";
import { PageHeader } from "shared";

export interface InAppProductInfoHeaderContainerProps {
    stage: string;
    id: number;
}

export function InAppProductInfoHeaderContainer({ stage, id }: InAppProductInfoHeaderContainerProps) {
    const info = useSelector(inAppProductInfoPageSelector(stage, id));

    return (
        <PageHeader
            withBackButton
            title={info.data?.title}
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {id}
                </Typography.Title>
            }
        />
    );
}

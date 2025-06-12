import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Typography } from "antd";

import { PageHeader } from "shared";
import { onboardingEntityPageSelector } from "features/onboarding-moderation/store/reducer/entitySelector";

export interface QuestGroupDetailsHeaderContainerProps {
    stage: string;
    id: number;
}

export function QuestGroupDetailsHeaderContainer({ stage, id }: QuestGroupDetailsHeaderContainerProps) {
    const data = useSelector(onboardingEntityPageSelector(stage, { id }, "questGroup"), shallowEqual).data?.[0];

    return (
        <PageHeader
            title={data?.title?.eng ?? "..."}
            withBackButton
            extra={
                <Typography.Title level={3} type="secondary">
                    ID: {data?.id ?? "..."}
                </Typography.Title>
            }
        />
    );
}

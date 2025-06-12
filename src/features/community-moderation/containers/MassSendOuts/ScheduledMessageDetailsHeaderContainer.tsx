import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Divider, Typography } from "antd";
import styled from "styled-components";

import { PageHeader } from "shared";
import { scheduledMessageByIdSelector } from "features/community-moderation/store/reducer/scheduledMessage/scheduledMessageListReducer";
import { ScheduledMessageStatusTag } from "features/community-moderation/components/MassSendOuts/ScheduledMessageStatusTag";

export interface ScheduledMessageDetailsHeaderContainerProps {
    stage: string;
    id: number;
}

export function ScheduledMessageDetailsHeaderContainer({ stage, id }: ScheduledMessageDetailsHeaderContainerProps) {
    const { data } = useSelector(scheduledMessageByIdSelector(stage, id), shallowEqual);

    return (
        <PageHeader
            withBackButton
            extra={
                <ExtraContainer>
                    <Typography.Title level={4} type="secondary">
                        ID: {data?.id ?? "..."}
                    </Typography.Title>
                    <Divider type="vertical" orientation="center" />
                    <Typography.Title level={4} type="secondary">
                        Status: {data ? <ScheduledMessageStatusTag scheduledMessage={data} /> : "..."}
                    </Typography.Title>
                </ExtraContainer>
            }
        />
    );
}

const ExtraContainer = styled.div`
    display: flex;
    width: max-content;
    justify-content: flex-end;
    text-align: center;

    .ant-divider {
        height: auto;
        margin: 0 16px;
    }
`;

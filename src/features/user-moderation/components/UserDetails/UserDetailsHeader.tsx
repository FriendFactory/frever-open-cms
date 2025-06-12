import React from "react";
import { Divider, Statistic } from "antd";

import { PageHeader } from "shared/components/PageHeader";
import { User } from "features/user-moderation/services";
import styled from "styled-components";

export interface UserDetailsHeaderProps {
    data?: User;
}

export function UserDetailsHeader({ data }: UserDetailsHeaderProps) {
    return (
        <PageHeader
            title={data?.mainGroup.nickName ?? "..."}
            withBackButton
            extra={
                <UserDetailsHeaderExtraStyled>
                    <Statistic title="Group ID" value={data?.mainGroupId ?? "..."} groupSeparator="" />
                    <Divider type="vertical" orientation="center" />
                    <Statistic title="User ID" value={data?.id ?? "..."} groupSeparator="" />
                </UserDetailsHeaderExtraStyled>
            }
        />
    );
}

const UserDetailsHeaderExtraStyled = styled.div`
    width: max-content;
    display: flex;
    justify-content: flex-end;
    text-align: center;

    .ant-divider {
        height: auto;
        margin: 0 32px;
    }
`;

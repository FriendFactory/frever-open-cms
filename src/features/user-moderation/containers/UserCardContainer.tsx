import React from "react";
import { useSelector } from "react-redux";

import { UserItemMeta } from "../components/UserItemMeta";
import { useCurrentStage } from "shared";
import { userDetailsPageSelector } from "../store/reducer/user/userDetailsReducer";
import { Card } from "antd";
import { CardProps } from "antd/es/card";

export interface UserCardContainerProps {
    groupId: number;
    actions?: CardProps["actions"];
}

export function UserCardContainer({ groupId, actions }: UserCardContainerProps) {
    const stage = useCurrentStage();
    const info = useSelector(userDetailsPageSelector({ stage, selector: "mainGroupId", id: groupId }));

    return info.data ? (
        <Card type="inner" actions={actions}>
            <UserItemMeta item={info.data} stage={stage} itemType="card" />
        </Card>
    ) : (
        <span>{groupId}</span>
    );
}

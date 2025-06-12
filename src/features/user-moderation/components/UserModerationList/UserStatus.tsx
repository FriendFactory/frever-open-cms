import React from "react";
import { Badge } from "antd";
import dayjs from "dayjs";

import { Group } from "features/user-moderation/services";

export interface UserStatusProps {
    deletedAt?: Group["deletedAt"];
    isBlocked?: Group["isBlocked"];
}

export function UserStatus({ deletedAt, isBlocked }: UserStatusProps) {
    return deletedAt ? (
        <Badge color="red" text={dayjs.utc(deletedAt).format("DD MMM YYYY  HH:mm:ss")} />
    ) : isBlocked ? (
        <Badge color="red" text="Yes" />
    ) : (
        <Badge color="blue" text="No" />
    );
}

import React from "react";
import { Descriptions } from "antd";
import dayjs from "dayjs";

import { User } from "features/user-moderation/services";

const { Item } = Descriptions;

export interface ExpandedRowProps {
    data: User;
}

export function ExpandedRow({ data }: ExpandedRowProps) {
    return (
        <Descriptions>
            <Item span={2} label="User ID">
                {data.id ?? "Unknown"}
            </Item>
            <Item span={2} label="Nickname">
                {data.mainGroup?.nickName ?? "Unknown"}
            </Item>
            <Item span={2} label="Email/phone">
                {data.email ?? data.phoneNumber ?? "Unknown"}
            </Item>
            <Item span={2} label="Group ID">
                {data.mainGroupId ?? "Unknown"}
            </Item>
            <Item span={2} label="Created&nbsp;Date">
                {data.createdTime ? dayjs.utc(data.createdTime).format("DD MMM YYYY HH:mm:ss") : "Unknown"}
            </Item>
            <Item span={2} label="Chara">
                {data.character?.length ?? "Unknown"}
            </Item>
            <Item span={2} label="Outfit">
                {data.mainGroup?.outfit?.length ?? "Unknown"}
            </Item>
            <Item span={2} label="Level">
                {data.mainGroup?.levelGroup?.length ?? "Unknown"}
            </Item>
            <Item span={2} label="isFeatured">
                {data.isFeatured ? "Yes" : "No"}
            </Item>
        </Descriptions>
    );
}


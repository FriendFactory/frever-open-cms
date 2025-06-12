import React from "react";
import { Avatar, Space } from "antd";

import { useCurrentStage } from "shared/hooks";
import { UserGroupShortInfo } from "./getUsers";
import { createCdnURLFromFiles } from "shared/image-url-creators";
import { NO_IMAGE_URL } from "config";

interface UserListItemProps {
    user: UserGroupShortInfo;
}

export function UserListItem({ user }: UserListItemProps) {
    const stage = useCurrentStage();

    return (
        <Space size="small">
            <Avatar
                size={16}
                src={
                    user.mainCharacter?.files
                        ? createCdnURLFromFiles({
                              stage,
                              files: user.mainCharacter.files,
                              resolution: "128x128",
                              entityType: "character",
                              id: user.mainCharacter.id
                          })
                        : NO_IMAGE_URL
                }
            />
            {user.mainGroup.nickName}
        </Space>
    );
}

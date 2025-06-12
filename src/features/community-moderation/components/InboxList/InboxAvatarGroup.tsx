import React from "react";
import { Avatar, Badge, Popover } from "antd";

import { InboxInfo } from "features/community-moderation/services/api";
import { getMemberThunbmail } from "features/chats-moderation/components/ChatMessage/ChatMessageItem";
import { useCurrentStage } from "shared";
import { Link } from "react-router-dom";
import { USER_DETAILS_INFO_URL } from "urls";

interface InboxAvatarGroupProps {
    data: InboxInfo;
}

export function InboxAvatarGroup({ data }: InboxAvatarGroupProps) {
    const stage = useCurrentStage();
    return (
        <Badge count={data.totalUnreadMessages} overflowCount={99}>
            <Avatar.Group size="large" maxCount={2}>
                {data?.members?.map((value) => (
                    <Link
                        key={value.id}
                        to={USER_DETAILS_INFO_URL.format({ stage, selector: "mainGroupId", id: value.id })}>
                        <Popover content={value.nickname}>
                            <Avatar
                                style={{ borderColor: "#8a2be280" }}
                                src={getMemberThunbmail(stage, value.mainCharacterId, value.mainCharacterFiles)}
                            />
                        </Popover>
                    </Link>
                ))}
            </Avatar.Group>
        </Badge>
    );
}

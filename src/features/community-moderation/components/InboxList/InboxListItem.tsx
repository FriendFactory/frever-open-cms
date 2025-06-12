import React, { useEffect } from "react";
import { Button, List, Typography } from "antd";
import styled from "styled-components";

import { InboxInfo } from "features/community-moderation/services/api";
import dayjs from "dayjs";
import { InboxAvatarGroup } from "./InboxAvatarGroup";
import { useHistory, useLocation } from "react-router";
import { COMMUNITY_CHAT_URL } from "urls";
import { useCurrentStage } from "shared";
import { useRightPaneVisibility } from "layout";

interface InboxListItemProps {
    item: InboxInfo;
}

export function InboxListItem({ item }: InboxListItemProps) {
    const stage = useCurrentStage();
    const history = useHistory();
    const location = useLocation();

    const { isRightVisible, openWindow } = useRightPaneVisibility();

    const handleOpenChat = (chatId: number) => () => {
        history.push(COMMUNITY_CHAT_URL.format({ stage }, { openChatId: chatId }));
        openWindow();
    };

    useEffect(() => {
        const urlMatch = COMMUNITY_CHAT_URL.match(location);
        if (!isRightVisible && urlMatch.isMatched && urlMatch.query?.openChatId) {
            openWindow();
        }
    }, []);

    return (
        <List.Item key={item.id}>
            <List.Item.Meta
                avatar={<InboxAvatarGroup data={item} />}
                title={<Typography.Paragraph ellipsis={true}>{item.title}</Typography.Paragraph>}
                description={
                    <Time ellipsis={true} type="secondary">
                        {dayjs(item.lastMessageTime).format("DD MMM YYYY HH:mm:ss")}
                    </Time>
                }
            />
            <Button ghost type="primary" onClick={handleOpenChat(item.id)}>
                Chat
            </Button>
        </List.Item>
    );
}

const Time = styled(Typography.Paragraph)``;

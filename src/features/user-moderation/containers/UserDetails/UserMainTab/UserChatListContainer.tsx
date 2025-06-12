import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";

import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { ChatsListContainer } from "features/chats-moderation";
import { chatsListByUserLoadAction } from "features/chats-moderation/store/actions";
import { USER_DETAILS_INFO_URL } from "urls";

export interface UserChatListContainerProps {}

export function UserChatListContainer({}: UserChatListContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    useEffect(() => {
        if (info.data) dispatch(chatsListByUserLoadAction({ mainGroupId: info.data.mainGroupId }));
    }, [info.data?.mainGroupId]);

    return (
        <Card title="Chats">
            {info.data && (
                <ChatsListContainer
                    stage={urlMatch.params.stage}
                    params={{ members: [info.data.mainGroupId] }}
                    scrollY={350}
                />
            )}
        </Card>
    );
}

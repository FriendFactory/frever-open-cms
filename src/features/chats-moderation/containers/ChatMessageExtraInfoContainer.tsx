import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { ChatMessage } from "../services";
import { executeMessageCommandAction } from "../store/actions";
import { useCurrentStage } from "shared";
import { ChatMessageExtraInfo } from "../components/ChatMessage/ChatMessageExtraInfo";

export interface ChatMessageExtraInfoProps {
    chatId: number;
    item: Pick<ChatMessage, "id" | "time" | "likeCount" | "isDeleted" | "isHidden">;
}

export function ChatMessageExtraInfoContainer({ item, chatId }: ChatMessageExtraInfoProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const handleOnChangeIsDeleted = () =>
        dispatch(
            executeMessageCommandAction({
                stage,
                chatId,
                command: { type: "change-status", isDeleted: !item.isDeleted, messageId: item.id }
            })
        );

    return (
        <ChatMessageExtraInfo
            time={dayjs(item.time).format("DD MMM YYYY HH:mm:ss")}
            likeCount={item.likeCount}
            isDeleted={item.isDeleted}
            isHidden={item.isHidden}
            onChangeIsDeleted={handleOnChangeIsDeleted}
        />
    );
}

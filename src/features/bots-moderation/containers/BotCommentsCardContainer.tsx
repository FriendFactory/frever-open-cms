import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { AppState } from "app-state";
import { useCurrentStage } from "shared";
import { NormalizedBot } from "../store/reducer/bot";
import { updateBotCommentsAction } from "../store/actions";
import { CommentListWindowContainer } from "./CommentListWindowContainer";

export interface BotCommentsCardContainerProps {
    children: JSX.Element;
    selectorFactory: (appState: AppState) => {
        loading: boolean;
        data?: NormalizedBot;
    };
}

export function BotCommentsCardContainer({ selectorFactory, children }: BotCommentsCardContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();
    const info = useSelector(selectorFactory);

    const comments = info.data?.comments;
    const botId = info.data?.id;

    const checkIsCommentAdded = useCallback((commentId: number) => comments?.includes(commentId), [comments]);

    const handleOnClick = useCallback(
        (action: "add" | "remove", commentId: number) => () => {
            if (botId && comments) {
                const newComments =
                    action === "add" ? [...comments, commentId] : comments?.filter((el) => el !== commentId);

                dispatch(updateBotCommentsAction({ stage, botId, comments: newComments }));
            } else {
                message.error("Something went wrong. Bot comments were not loaded");
            }
        },
        [botId, comments]
    );

    return (
        <Card
            title="Comments"
            loading={info.loading && !info.data}
            extra={
                comments && (
                    <CommentListWindowContainer
                        renderAction={(commentId) => {
                            const isCommentAdded = checkIsCommentAdded(commentId);
                            return (
                                <Button
                                    type="primary"
                                    ghost
                                    icon={isCommentAdded ? <MinusOutlined /> : <PlusOutlined />}
                                    danger={isCommentAdded}
                                    onClick={handleOnClick(isCommentAdded ? "remove" : "add", commentId)}
                                />
                            );
                        }}
                    />
                )
            }>
            {children}
        </Card>
    );
}

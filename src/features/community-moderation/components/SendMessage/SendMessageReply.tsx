import React from "react";
import { Alert, Form, Typography } from "antd";
import dayjs from "dayjs";

import { ChatConversationMessage } from "features/community-moderation/services/api";
import { Time } from "../ChatMessage/ChatMessageExtraInfo";
import { Nickname } from "../ChatMessage/ChatMessageItem";

interface SendMessageReplyProps {}

export function SendMessageReply({}: SendMessageReplyProps) {
    return (
        <Form.Item shouldUpdate noStyle>
            {({ getFieldValue, setFieldValue }) => {
                const replyMessage: ChatConversationMessage | undefined = getFieldValue("replyMessage");

                return (
                    <>
                        {replyMessage && (
                            <Alert
                                message={
                                    <Typography.Text>
                                        Replying to{" "}
                                        <Nickname strong style={{ display: "inline" }}>
                                            {replyMessage.group?.nickname}
                                        </Nickname>{" "}
                                        <Time type="secondary" style={{ display: "inline" }}>
                                            {dayjs(replyMessage.time).format("DD MMM YYYY HH:mm:ss")}
                                        </Time>
                                    </Typography.Text>
                                }
                                type="info"
                                closable
                                afterClose={() => setFieldValue("replyMessage", undefined)}
                            />
                        )}
                    </>
                );
            }}
        </Form.Item>
    );
}

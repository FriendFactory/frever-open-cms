import React from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import dayjs from "dayjs";
import { Descriptions } from "antd";
import { Link } from "react-router-dom";

import { ChatMessageReport } from "../services";
import { CHAT_HISTORY_PAGE_URL, USER_DETAILS_INFO_URL } from "urls";
import { ChatMessageContent } from "../containers/ReportedChatMessagesContainer";

const { Item } = Descriptions;

export interface ReportedChatMessageExpandedRowProps {
    stage: string;
    data: ChatMessageReport;
    reportingReason: string;
    chatMessageContentComponent: ChatMessageContent;
}

export function ReportedChatMessageExpandedRow({
    stage,
    data,
    reportingReason,
    chatMessageContentComponent
}: ReportedChatMessageExpandedRowProps) {
    const screens = useBreakpoint();
    const ChatMessageContent = chatMessageContentComponent;

    return (
        <Descriptions>
            <Item label="Chat Message" span={24}>
                <ChatMessageContent stage={stage} message={data.reportMessage} mediaHeight={150} />
            </Item>
            <Item label="Report Text" span={24}>
                {data.reportText}
            </Item>
            {!screens.md && (
                <>
                    <Item label="Reporting Reason" span={24}>
                        {reportingReason ?? "Unknown"}
                    </Item>
                    <Item span={12} label="GoupId ID">
                        <Link
                            to={USER_DETAILS_INFO_URL.format({
                                stage,
                                selector: "mainGroupId",
                                id: data.groupId
                            })}>
                            {data.groupId}
                        </Link>
                    </Item>
                    <Item span={12} label="Chat Message">
                        <Link
                            to={CHAT_HISTORY_PAGE_URL.format(
                                { stage, chatId: data.chatId },
                                { target: data.chatMessageId }
                            )}>
                            Open chat
                        </Link>
                    </Item>
                    <Item span={12} label="Video Hidden">
                        {data.hideMessage ? "Yes" : "No"}
                    </Item>
                    <Item span={24} label="Reported At">
                        {dayjs.utc(data.createdTime).format("DD MMM YYYY HH:mm:ss") ?? "Unknown"}
                    </Item>
                    <Item span={24} label="Closed At">
                        {data.closedTime ? dayjs.utc(data.closedTime).format("DD MMM YYYY HH:mm:ss") : "No"}
                    </Item>
                </>
            )}
        </Descriptions>
    );
}

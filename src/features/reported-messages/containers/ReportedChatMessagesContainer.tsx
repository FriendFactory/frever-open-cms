import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Button, Table, TableProps } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import { createSortableColumnProps, useExtraData } from "shared";
import { CHAT_HISTORY_PAGE_URL, REPORTED_CHAT_MESSAGE_LIST_URL, USER_DETAILS_INFO_URL } from "urls";
import { ChatMessageReport, ReportedMessageListParams } from "../services";
import { ReportedChatMessageCommandContainer } from "./ReportedChatMessageCommandContainer";
import { reportedMessageListSelector } from "../store/reducer/reportedMessageListReducer";
import { ReportedChatMessageExpandedRow } from "../components/ReportedChatMessageExpandedRow";
import { ChatMessage } from "features/chats-moderation";

export type ChatMessageContent = React.ComponentType<{
    stage: string;
    message?: ChatMessage;
    mediaHeight?: number;
    collapseMediaContent?: boolean;
}>;

export interface ReportedChatMessagesContainerProps {
    stage: string;
    params?: ReportedMessageListParams;
    chatMessageContentComponent: ChatMessageContent;
}

export function ReportedChatMessagesContainer({
    stage,
    params,
    chatMessageContentComponent
}: ReportedChatMessagesContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const ChatMessageContent = chatMessageContentComponent;

    const { data, loading } = useSelector(reportedMessageListSelector(stage, params || {}));
    const reasons = useExtraData({ stage, name: "chat/moderation/report/reason" });

    const handleOnChange: TableProps<ChatMessageReport>["onChange"] = (_paging, _filter, sorterResult) => {
        const sorter = Array.isArray(sorterResult) ? undefined : sorterResult;
        const params: ReportedMessageListParams = {
            orderBy: sorter?.order ? (sorter.columnKey as ReportedMessageListParams["orderBy"]) : undefined,
            sortDirection: sorter?.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = REPORTED_CHAT_MESSAGE_LIST_URL.replace(location, {}, params);
        newUrl && history.replace(newUrl);
    };

    const sortableColumnProps = createSortableColumnProps<ReportedMessageListParams["orderBy"]>(
        params?.orderBy,
        params?.sortDirection
    );

    const columns: ColumnsType<ChatMessageReport> = [
        {
            dataIndex: "id",
            title: "ID",
            width: 110,
            ...sortableColumnProps("id")
        },
        {
            dataIndex: "groupId",
            title: "Group ID",
            width: 110,
            render: (_, r) => (
                <Link
                    to={USER_DETAILS_INFO_URL.format({
                        stage,
                        selector: "mainGroupId",
                        id: r.groupId
                    })}>
                    {r.groupId}
                </Link>
            ),
            ...sortableColumnProps("groupId")
        },
        {
            title: "Reason",
            width: 110,
            render: (_, r) => reasons?.data?.find((e) => e.id === r.reasonId)?.name ?? "Unknown"
        },
        {
            title: "Message Hidden",
            width: 110,
            render: (_, r) => (r.hideMessage ? "Yes" : "No"),
            ...sortableColumnProps("hideMessage")
        },
        {
            title: "Reported At",
            width: 110,
            render: (_, r) => dayjs.utc(r.createdTime).format("DD MMM YYYY HH:mm:ss"),
            ...sortableColumnProps("createdTime")
        },
        {
            title: "Closed At",
            width: 110,
            render: (_, r) => (r.closedTime ? dayjs.utc(r.closedTime).format("DD MMM YYYY HH:mm:ss") : "No")
        },
        {
            title: "Report Message",
            dataIndex: "reportText",
            width: 120,
            ellipsis: true
        },
        {
            title: "Chat Message",
            dataIndex: "reportMessage",
            width: 200,
            ellipsis: true,
            render: (_, r) => <ChatMessageContent stage={stage} message={r.reportMessage} collapseMediaContent />
        },
        {
            align: "right",
            width: 100,
            render: (_, r) => (
                <Button type="link">
                    <Link to={CHAT_HISTORY_PAGE_URL.format({ stage, chatId: r.chatId }, { target: r.chatMessageId })}>
                        Open chat
                    </Link>
                </Button>
            )
        },
        {
            fixed: "right",
            align: "right",
            width: 65,
            render: (_, r) => <ReportedChatMessageCommandContainer report={r} />
        }
    ];

    return (
        <Table
            sticky
            rowKey="id"
            dataSource={data}
            columns={columns}
            loading={loading || reasons.loading}
            onChange={handleOnChange}
            pagination={false}
            expandable={{
                expandedRowRender: (record) => (
                    <ReportedChatMessageExpandedRow
                        stage={stage}
                        data={record}
                        reportingReason={reasons?.data?.find((e) => e.id === record.reasonId)?.name ?? "Unknown"}
                        chatMessageContentComponent={chatMessageContentComponent}
                    />
                ),
                fixed: "left"
            }}
            scroll={{ x: 500 }}
        />
    );
}

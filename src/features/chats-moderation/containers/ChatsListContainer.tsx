import React from "react";
import { Badge, Table } from "antd";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";
import { useHistory } from "react-router";
import dayjs from "dayjs";

import { ChatInfo, ChatListQueryParams, ChatTypes } from "../services";
import { chatsListPageSelector } from "../store/reducer/chatsList/listReducer";
import { CHAT_HISTORY_PAGE_URL } from "urls";

interface ChatsListContainerProps {
    stage: string;
    params?: ChatListQueryParams;
    scrollY?: number;
}

export function ChatsListContainer({ stage, params, scrollY }: ChatsListContainerProps) {
    const history = useHistory();

    const info = useSelector(chatsListPageSelector(stage, params));

    const onRow = (record: ChatInfo) => ({
        onClick: () => history.push(CHAT_HISTORY_PAGE_URL.format({ stage, chatId: record.id }))
    });

    return (
        <Table
            rowKey="id"
            scroll={{ x: 700, y: scrollY }}
            onRow={onRow}
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            pagination={false}
        />
    );
}

const columns: ColumnsType<ChatInfo> = [
    {
        title: "ID",
        dataIndex: "id",
        width: 100
    },
    {
        title: "Title",
        dataIndex: "title",
        width: 200
    },
    {
        title: "Chat Type",
        width: 100,
        render: (_, rec) => ChatTypes[rec.type]
    },
    {
        title: "Member count",
        width: 100,
        render: (_, rec) => rec.members.length
    },
    {
        title: "Last Message Time",
        width: 150,
        render: (_, rec) => dayjs.utc(rec.lastMessageTime).format("DD MMM YYYY HH:mm")
    },
    {
        title: "Status",
        width: 150,
        render: (_, rec) => <Badge color={rec.isDeleted ? "red" : "blue"} text={rec.isDeleted ? "Deleted" : "Active"} />
    }
];

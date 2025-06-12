import React, { useState } from "react";
import { Alert, Badge, Button, Dropdown, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";
import { DeleteOutlined, MoreOutlined, UndoOutlined } from "@ant-design/icons";
import { TableRowSelection } from "antd/lib/table/interface";
import { useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { executeCommentCommandAction, videoCommentsPageSelector } from "../store";
import { VideoComment, VideoCommentsQueryParams } from "../services";
import { USER_DETAILS_INFO_URL, VIDEO_MODERATION_DETAILS_URL } from "urls";
import { ProtectedLink } from "shared";

export interface CommentaContainerProps {
    url: UrlPath<{ stage: string }, VideoCommentsQueryParams>;
    extraSelector: { name: "videoId" | "group"; value: number };
}

export function CommentListContainer({ url, extraSelector }: CommentaContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const [selectedComments, setSelectedComments] = useState<VideoComment[]>([]);
    const info = useSelector(
        videoCommentsPageSelector(urlMatch.params.stage, {
            ...urlMatch.query,
            [extraSelector.name]: extraSelector.value
        })
    );

    const executeCommentsCommand = (commentList: VideoComment[]) => (operation: "delete" | "undelete") => {
        const comments = commentList.filter(
            (comment) =>
                (operation === "undelete" && comment.isDeleted) || (operation === "delete" && !comment.isDeleted)
        );

        dispatch(
            executeCommentCommandAction({
                stage: urlMatch.params.stage,
                comments
            })
        );

        setSelectedComments([]);
    };

    const handleRowSelection: TableRowSelection<VideoComment> = {
        onChange: (_, selectedComments) => setSelectedComments(selectedComments),
        selectedRowKeys: selectedComments.map((el) => el.id),
        fixed: true
    };

    const columns: ColumnType<VideoComment>[] = [
        {
            key: "videoId",
            title: "Video ID",
            dataIndex: "videoId",
            width: 90,
            render: (_, record) => (
                <ProtectedLink
                    feature="VideoModeration"
                    to={VIDEO_MODERATION_DETAILS_URL.format({ stage: urlMatch.params.stage, id: record.videoId })}>
                    {record.videoId}
                </ProtectedLink>
            )
        },
        {
            key: "groupId",
            title: "Group",
            dataIndex: "groupId",
            width: 90,
            render: (_, record) => (
                <ProtectedLink
                    feature="Social"
                    to={USER_DETAILS_INFO_URL.format({
                        stage: urlMatch.params.stage,
                        selector: "mainGroupId",
                        id: record.groupId
                    })}>
                    {record.groupId}
                </ProtectedLink>
            )
        },
        {
            key: "nickname",
            title: "Nickname",
            dataIndex: "groupNickname",
            width: 120
        },
        Table.EXPAND_COLUMN,
        {
            key: "text",
            title: "Text",
            dataIndex: "text",
            ellipsis: true,
            width: 220
        },
        {
            key: "posted",
            title: "Posted",
            render: (_, comment) => (comment.time ? dayjs.utc(comment.time).format("DD MMM YYYY HH:mm:ss") : "Unknown"),
            width: 110
        },
        {
            key: "status",
            title: "Status",
            align: "center",
            render: (_, comment) =>
                comment.isDeleted ? <Badge color="red" text="Deleted" /> : <Badge color="blue" text="Active" />,
            width: 100
        },
        {
            key: "action",
            title: renderCommands(!selectedComments.length, executeCommentsCommand(selectedComments)),
            render: (_, comment) => {
                const action = comment.isDeleted ? "undelete" : "delete";
                return (
                    <Button
                        danger={!comment.isDeleted}
                        type="primary"
                        ghost
                        icon={comment.isDeleted ? <UndoOutlined /> : <DeleteOutlined />}
                        onClick={() => executeCommentsCommand([comment])(action)}
                    />
                );
            },
            width: 70,
            align: "right",
            fixed: "right"
        }
    ];

    return (
        <Table
            rowKey={(comment) => comment.id}
            rowSelection={handleRowSelection}
            scroll={{ x: 600 }}
            dataSource={info.data}
            columns={columns}
            loading={info.loading}
            pagination={false}
            expandable={{ expandedRowRender: renderExpandedRowRender }}
        />
    );
}

const renderExpandedRowRender = (record: VideoComment) => <div>{record.text}</div>;

const renderCommands = (isBtnDisabled: boolean, cb: (operation: "delete" | "undelete") => void) => {
    const items = [
        {
            key: "delete-all",
            disabled: isBtnDisabled,
            label: "Delete selected",
            onClick: () => cb("delete")
        },
        {
            key: "undelete-all",
            disabled: isBtnDisabled,
            label: "Undelete selected",
            onClick: () => cb("undelete")
        }
    ];
    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
};

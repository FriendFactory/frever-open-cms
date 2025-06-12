import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Button, Popconfirm } from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import { DeleteOutlined } from "@ant-design/icons";

import { useHashtagListData } from "../hooks/useHashtagListData";
import { deleteHashtagAction, updateHashtagAction } from "../store/actions";
import { HASHTAG_LIST_PAGE_URL } from "urls";
import { GetHashtagListParams, Hashtag } from "../services";
import { VIDEO_MODERATION_LIST_URL } from "urls";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    createSortableColumnProps,
    EditableTable,
    EditableTableColumn,
    ProtectedLink
} from "shared";

export function HashtagListContainer() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const urlMatch = HASHTAG_LIST_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const {
        query,
        params: { stage }
    } = urlMatch;

    const { info, loadNextPage } = useHashtagListData({ stage, params: query || {} });

    const sortableColumnProps = createSortableColumnProps(info.params?.sortBy, info.params?.sortDirection);

    const handleTableOnChange = (
        _paging: unknown,
        _filter: Record<string, FilterValue | null>,
        sorter: SorterResult<any>
    ) => {
        const newUrl = HASHTAG_LIST_PAGE_URL.replace(
            location,
            {},
            {
                skip: 0,
                sortBy: sorter.order ? (sorter.columnKey as GetHashtagListParams["sortBy"]) : undefined,
                sortDirection:
                    sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
            }
        );

        if (newUrl) history.push(newUrl);
    };

    const handleOnFinish = (hashtag: Hashtag) =>
        dispatch(updateHashtagAction({ stage, id: hashtag.id, data: hashtag }));

    const handleOnClickDelete = useCallback(
        (id: number) => () => dispatch(deleteHashtagAction({ stage, id })),
        [stage]
    );

    const columns: EditableTableColumn<Hashtag>[] = [
        {
            title: "ID",
            width: 115,
            dataIndex: "id",
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 225,
            editableCellProps: { type: "string" },
            ...sortableColumnProps("name")
        },
        {
            title: "Views Count",
            dataIndex: "viewsCount",
            width: 115,
            ...sortableColumnProps("viewsCount")
        },
        {
            title: "Challenge Sort Order",
            dataIndex: "challengeSortOrder",
            ...sortableColumnProps("ChallengeSortOrder"),
            width: 115,
            editableCellProps: { type: "number" }
        },
        {
            title: "Video Count",
            dataIndex: "videoCount",
            width: 115,
            ...sortableColumnProps("videoCount"),
            render: (_, record) => (
                <ProtectedLink
                    feature="VideoModeration"
                    to={VIDEO_MODERATION_LIST_URL.format({ stage }, { hashtag: record.name })}>
                    {record.videoCount}
                </ProtectedLink>
            )
        }
    ];

    const actionColumn = {
        render: (props: ActionColumnRenderProps<Hashtag>) =>
            actionColumnRender({
                ...props,
                extra: (record) => (
                    <Popconfirm
                        title="Are you sure to delete this hashtag?"
                        onConfirm={handleOnClickDelete(record.id)}
                        okText="Yes"
                        cancelText="No">
                        <Button danger ghost icon={<DeleteOutlined />} />
                    </Popconfirm>
                )
            })
    };

    return (
        <>
            <EditableTable
                loading={!info.data?.length && info.loading}
                dataSource={info.data}
                columns={columns}
                actionColumnProps={actionColumn}
                onChange={handleTableOnChange as any}
                pagination={false}
                onFinish={handleOnFinish}
                scroll={{ x: 700 }}
            />
            <Button
                disabled={!info.isNextPageAvailable}
                loading={info.loading}
                type="primary"
                block
                onClick={loadNextPage}
                ghost>
                Load More Hashtags
            </Button>
        </>
    );
}

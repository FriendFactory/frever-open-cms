import React from "react";
import { TableProps, Typography } from "antd";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { MASS_SEND_OUTS_DETAILS_PAGE_URL, MASS_SEND_OUTS_LIST_PAGE_URL } from "urls";
import { createSortableColumnProps, EditableTable, EditableTableColumn } from "shared";
import { CreateMassSendOutsContainer } from "./CreateMassSendOutsContainer";
import { ScheduledMessageQueryParams } from "features/community-moderation/services/scheduledMessage/getScheduledMessage";
import { ScheduledMessageStatusTag } from "features/community-moderation/components/MassSendOuts/ScheduledMessageStatusTag";
import { scheduledMessageListPageSelector } from "features/community-moderation/store/reducer/scheduledMessage/scheduledMessageListReducer";
import { ScheduledMessage } from "features/community-moderation/services/api";
import { upsertScheduledMessageAction } from "features/community-moderation/store/actions/scheduledMessageList";

interface MassSendOutsListContainerProps {
    stage: string;
    params: ScheduledMessageQueryParams;
}

export function MassSendOutsListContainer({ stage, params }: MassSendOutsListContainerProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { data, loading } = useSelector(scheduledMessageListPageSelector(stage, params));

    const handleOnFinish = (data: ScheduledMessage, sourceData: ScheduledMessage) => {
        dispatch(upsertScheduledMessageAction({ stage, data: { ...sourceData, ...data } }));
    };

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<ScheduledMessage>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: ScheduledMessageQueryParams = {
            orderBy: sorter.order ? (sorter.columnKey as ScheduledMessageQueryParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = MASS_SEND_OUTS_LIST_PAGE_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const handleOnRow = (entity: ScheduledMessage) => ({
        onClick: () => history.push(MASS_SEND_OUTS_DETAILS_PAGE_URL.format({ stage, id: entity.id }))
    });

    const columns: EditableTableColumn<ScheduledMessage>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            ...sortableColumnProps("id")
        },
        {
            title: "Text",
            dataIndex: "text",
            editableCellProps: { type: "textarea" },
            width: 180,
            render: (_, record) => (
                <Typography.Paragraph ellipsis={{ tooltip: record.text }}>{record.text}</Typography.Paragraph>
            )
        },
        {
            title: "Scheduled Time",
            dataIndex: "scheduledForTime",
            editableCellProps: (record) => ({
                type: "date",
                defaultValue: dayjs.utc(record.scheduledForTime),
                showTime: { format: "HH:mm" },
                format: "DD MMM YYYY HH:mm"
            }),
            width: 120,
            render: (_, record) => dayjs.utc(record.scheduledForTime).format("DD MMM YYYY HH:mm") ?? "Unknown"
        },
        {
            title: "Status",
            dataIndex: "status",
            align: "right",
            width: 100,
            render: (_, record) => <ScheduledMessageStatusTag scheduledMessage={record} />
        }
    ];

    const actionColumnsProps = {
        title: <CreateMassSendOutsContainer />
    };

    return (
        <EditableTable
            dataSource={data}
            loading={!data && loading}
            columns={columns}
            pagination={false}
            onRow={handleOnRow}
            onFinish={handleOnFinish}
            onChange={handleOnChange}
            actionColumnProps={actionColumnsProps}
        />
    );
}

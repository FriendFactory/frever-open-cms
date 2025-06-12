import React from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Table, TableProps } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import { USER_VIDEOCLIP_LIST_TAB_URL, VIDEOCLIP_DETAILS_URL } from "urls";
import { userMediaFileListPageSelector } from "features/user-media/store/reducer/userMediaFileListReducer";
import { GetUserVideoClipParams, VideoClip } from "features/user-media/services";
import { createSortableColumnProps } from "shared";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface UserVideoClipListContainerProps {}

export function UserVideoClipListContainer({}: UserVideoClipListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_VIDEOCLIP_LIST_TAB_URL.match(location);
    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;
    const params = urlMatch.query;

    const info = useSelector(userMediaFileListPageSelector(urlMatch.params.stage, "VideoClip", params));

    const sortableColumnProps = createSortableColumnProps(params?.orderBy, params?.sortDirection);

    const handleOnChange: TableProps<VideoClip>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: GetUserVideoClipParams = {
            orderBy: sorter.order ? (sorter.columnKey as GetUserVideoClipParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = USER_VIDEOCLIP_LIST_TAB_URL.replace(location, {}, { ...params });
        newUrl && history.replace(newUrl);
    };

    const onRow = (record: VideoClip) => ({
        onClick: () => {
            history.push(VIDEOCLIP_DETAILS_URL.format({ stage: urlMatch.params.stage, id: record.id }));
        }
    });

    const columns: ColumnsType<VideoClip> = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            ...sortableColumnProps("id")
        },
        {
            title: "Created Time",
            width: 160,
            render: (_, videoClip) => {
                const createdTime = videoClip.createdTime;
                return createdTime ? dayjs.utc(createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown";
            },
            ...sortableColumnProps("createdTime")
        },
        {
            title: "ModifiedTime Time",
            width: 160,
            render: (_, videoClip) => {
                const modifiedTime = videoClip.modifiedTime;
                return modifiedTime ? dayjs.utc(modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown";
            },
            ...sortableColumnProps("modifiedTime")
        },
        {
            title: "Duration",
            dataIndex: "duration",
            width: 115,
            render: (_, videoClip) => (videoClip.duration ? dayjs.duration(videoClip.duration).format("m:s") : ""),
            ...sortableColumnProps("duration")
        },
        {
            title: "Height",
            dataIndex: "resolutionHeight",
            width: 115
        },
        {
            title: "Width",
            dataIndex: "resolutionWidth",
            width: 115
        },
        {
            width: 155,
            title: "Readiness",
            dataIndex: "readinessId",
            render: (_, videoClip) =>
                videoClip.readinessId ? <ReadinessTag stage={stage} readinessId={videoClip.readinessId} /> : "Unknown"
        }
    ];

    return (
        <Table
            rowKey="id"
            loading={info.loading}
            dataSource={info.data}
            columns={columns}
            onChange={handleOnChange}
            onRow={onRow}
            pagination={false}
            scroll={{ x: 750 }}
        />
    );
}

import React, { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Table } from "antd";
import { ColumnsType, SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";

import { createSortableColumnProps, ProtectedLink, useExtraData } from "shared";
import { GetReportedVideoListParams, ReportedVideoInfo } from "../services";
import { ReportedVideoExpandedRow } from "../components/ReportedVideoExpandedRow";
import { VIDEO_MODERATION_DETAILS_URL, REPORTED_VIDEO_LIST_URL, USER_DETAILS_INFO_URL } from "urls";
import { ReportedVideoCommandContainer } from "./ReportedVideoCommandContainer";
import { reportedVideoListSelector } from "../store/reducer/reportedVideoListReducer";
import { ReportedVideoPreview } from "../components/ReportedVideoPreview";

interface ReportedVideoListContainerProps {
    stage: string;
    params?: GetReportedVideoListParams;
}

export function ReportedVideoListContainer({ stage, params }: ReportedVideoListContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const { data, loading } = useSelector(reportedVideoListSelector(stage, params || {}), shallowEqual);
    const reasons = useExtraData({ stage, name: "video-report/moderation/reasons" });

    const sortableProps = createSortableColumnProps<GetReportedVideoListParams["sort"]>(
        params?.sort,
        params?.sortDirection
    );

    const onSort = useCallback(
        (sort: GetReportedVideoListParams["sort"], sortDirection: GetReportedVideoListParams["sortDirection"]) => {
            const newUrl = REPORTED_VIDEO_LIST_URL.replace(location, {}, { sort, sortDirection });

            if (newUrl) history.push(newUrl);
        },
        [location, history]
    );

    const handleOnChange = (_paging: unknown, _filter: unknown, sorter: SorterResult<any>) => {
        if (sorter.columnKey) {
            if (sorter.order === undefined) {
                onSort(undefined, undefined);
            } else {
                onSort(sorter.columnKey as any, sorter.order === "ascend" ? "asc" : "desc");
            }
        }
    };

    const columns: ColumnsType<ReportedVideoInfo> = [
        {
            dataIndex: ["report", "id"],
            title: "ID",
            width: 110,
            ...sortableProps("report/id")
        },
        {
            title: "Video ID",
            width: 110,
            render: (_, r) => (
                <ProtectedLink
                    target="_blank"
                    feature="VideoModeration"
                    to={VIDEO_MODERATION_DETAILS_URL.format({
                        id: r.video.id,
                        stage
                    })}>
                    {r.video.id}
                </ProtectedLink>
            ),
            ...sortableProps("report/videoId")
        },
        {
            title: "Video",
            width: 150,
            render: (_, r) => <ReportedVideoPreview videoId={r.video.id} />
        },
        {
            title: "User",
            width: 110,
            render: (_, r) => r.video.groupNickName ?? "Unknown",
            ...sortableProps("video/groupNickName")
        },
        {
            title: "Video Hidden",
            width: 110,
            render: (_, r) => (r.report.hideVideo ? "Yes" : "No")
        },
        {
            title: "Reason",
            width: 110,
            render: (_, r) => reasons?.data?.find((e) => e.id === r.report.reasonId)?.name ?? "Unknown"
        },
        {
            title: "Reported At",
            width: 110,
            render: (_, r) => dayjs.utc(r.report.createdTime).format("DD MMM YYYY HH:mm:ss"),
            ...sortableProps("report/createdTime")
        },
        {
            title: "Closed At",
            width: 110,
            render: (_, r) =>
                r.report.closedTime ? dayjs.utc(r.report.closedTime).format("DD MMM YYYY HH:mm:ss") : "No"
        },
        {
            dataIndex: ["report", "reporterGroupId"],
            title: "Reported By",
            render: (_, r) =>
                r.report?.reporterGroupId ? (
                    <ProtectedLink
                        feature="Social"
                        to={USER_DETAILS_INFO_URL.format({
                            stage,
                            selector: "mainGroupId",
                            id: r.report.reporterGroupId
                        })}>
                        {r.report.reporterGroupId}
                    </ProtectedLink>
                ) : (
                    "<Unknown>"
                ),
            width: 110
        },
        {
            dataIndex: ["report", "message"],
            title: "Message",
            width: 150,
            ellipsis: true
        },
        {
            fixed: "right",
            width: 65,
            render: (_, r) => <ReportedVideoCommandContainer report={r} />
        }
    ];

    return (
        <Table
            sticky
            rowKey={(row) => row.report.id}
            dataSource={data}
            columns={columns}
            loading={loading || reasons.loading}
            onChange={handleOnChange as any}
            pagination={false}
            expandable={{
                expandedRowRender: (record) => (
                    <ReportedVideoExpandedRow
                        stage={stage}
                        data={record}
                        reportingReason={reasons?.data?.find((e) => e.id === record.report.reasonId)?.name ?? "Unknown"}
                    />
                ),
                fixed: "left"
            }}
            scroll={{ x: 500 }}
        />
    );
}

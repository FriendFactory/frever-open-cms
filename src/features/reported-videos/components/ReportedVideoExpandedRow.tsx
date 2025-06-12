import React from "react";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { ReportedVideoInfo } from "../services";
import { USER_DETAILS_INFO_URL, VIDEO_MODERATION_DETAILS_URL } from "urls";
import { ProtectedLink } from "shared";

const { Item } = Descriptions;

export interface ReportedVideoExpandedRowProps {
    stage: string;
    data: ReportedVideoInfo;
    reportingReason: string;
}

export function ReportedVideoExpandedRow({ stage, data, reportingReason }: ReportedVideoExpandedRowProps) {
    const screens = useBreakpoint();
    return (
        <Descriptions>
            <Item label="Message" span={24}>
                {data.report.message}
            </Item>
            <Item label="Description" span={24}>
                {data.video.description ? data.video.description : "<Null>"}
            </Item>
            {!screens.md && (
                <>
                    <Item label="Reporting Reason" span={24}>
                        {reportingReason ?? "Unknown"}
                    </Item>
                    <Item span={12} label="Video ID">
                        {(
                            <ProtectedLink
                                feature="VideoModeration"
                                to={VIDEO_MODERATION_DETAILS_URL.format({
                                    id: data.video.id,
                                    stage
                                })}>
                                {data.video.id}
                            </ProtectedLink>
                        ) ?? "Unknown"}
                    </Item>
                    <Item span={12} label="Video Hidden">
                        {data.report.hideVideo ? "Yes" : "No"}
                    </Item>
                    <Item span={12} label="User">
                        {data.video.groupNickName ?? "Unknown"}
                    </Item>
                    <Item span={12} label="Reported By">
                        {data.report?.reporterGroupId ? (
                            <ProtectedLink
                                feature="Social"
                                to={USER_DETAILS_INFO_URL.format({
                                    stage,
                                    selector: "mainGroupId",
                                    id: data.report.reporterGroupId
                                })}>
                                {data.report.reporterGroupId}
                            </ProtectedLink>
                        ) : (
                            "<Unknown>"
                        )}
                    </Item>
                    <Item span={24} label="Reported At">
                        {dayjs.utc(data.report.createdTime).format("DD MMM YYYY HH:mm:ss") ?? "Unknown"}
                    </Item>
                    <Item span={24} label="Closed At">
                        {data.report.closedTime
                            ? dayjs.utc(data.report.closedTime).format("DD MMM YYYY HH:mm:ss")
                            : "No"}
                    </Item>
                </>
            )}
        </Descriptions>
    );
}

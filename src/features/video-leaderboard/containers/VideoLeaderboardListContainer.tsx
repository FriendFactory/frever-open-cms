import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
import { ColumnType } from "antd/lib/table";

import { ProtectedLink } from "shared";
import { USER_DETAILS_INFO_URL, DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import { VideoCard } from "features/video-moderation/components/VideoCard";
import { getVideoEditorType } from "../helpers";
import { VideoLeaderboardQueryParams, LeaderboardVideo } from "../services";
import { videoLeaderboardListPageSelector } from "../store/reducer";

interface VideoLeaderboardListContainerProps {
    stage: string;
    params: VideoLeaderboardQueryParams;
}

export function VideoLeaderboardListContainer({ stage, params }: VideoLeaderboardListContainerProps) {
    const info = useSelector(videoLeaderboardListPageSelector(stage, params));

    const columns: ColumnType<LeaderboardVideo>[] = [
        {
            title: "Rank",
            width: 80,
            render: (_, _video, index) =>
                index + Math.floor((info.currentPage - 1) * DEFAULT_VIDEO_LEADERBOARD_LIST_PAGE_SIZE) + 1
        },
        {
            title: "Thumbnail",
            width: 156,
            render: (_, video) => (
                <div style={{ width: "146px" }}>
                    <VideoCard value={video} stage={stage} currentQuery={{}} />
                </div>
            )
        },
        {
            title: "Group",
            width: 90,
            render: (_, video) =>
                (
                    <ProtectedLink
                        feature="Social"
                        to={USER_DETAILS_INFO_URL.format({
                            stage,
                            selector: "mainGroupId",
                            id: video.groupId
                        })}>
                        {video.groupId}
                    </ProtectedLink>
                ) ?? "Unknown"
        },
        {
            title: "Nickname",
            width: 130,
            dataIndex: "groupNickName"
        },
        {
            title: "Views",
            width: 80,
            dataIndex: ["kpi", "views"]
        },
        {
            title: "Likes",
            width: 80,
            dataIndex: ["kpi", "likes"]
        },
        {
            title: "Comments",
            width: 80,
            dataIndex: ["kpi", "comments"]
        },
        {
            title: "Engagement Rate",
            width: 130,
            render: (_, video) => video.kpi?.engagementRate + "%" ?? "Unknown"
        },
        {
            title: "Editor",
            width: 130,
            render: (_, video) => getVideoEditorType(video)
        },
        {
            title: "Premium Music",
            width: 100,
            render: (_, video) => (video?.externalSongIds?.length ? "Yes" : "No")
        }
    ];

    return (
        <Table
            rowKey={(video) => video.id}
            loading={info.loading && !info.data}
            dataSource={info.data}
            columns={columns}
            pagination={false}
            scroll={{ x: 600 }}
        />
    );
}

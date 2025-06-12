import React from "react";
import { Avatar, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE } from "urls";
import { UserSocialProfile } from "features/user-leaderboard/services";
import { createCdnURLFromFiles } from "shared";

export interface LeaderboardGridProps {
    loading: boolean;
    data: UserSocialProfile[];
    stage: string;
    currentPage: number;
    onRow: (user: UserSocialProfile) => { onClick: () => void };
}
export function LeaderboardGrid({ stage, currentPage, data, loading, onRow }: LeaderboardGridProps) {
    const columns: ColumnsType<UserSocialProfile> = [
        {
            title: "Rank",
            fixed: "left",
            width: 80,
            render: (_, _user, index) =>
                index + Math.floor((currentPage - 1) * DEFAULT_USER_LEADERBOARD_LIST_PAGE_SIZE) + 1
        },
        {
            title: "Thumbnail",
            width: 105,
            render: (_, user) => (
                <Avatar
                    shape="square"
                    size={85}
                    src={
                        user.mainCharacter
                            ? createCdnURLFromFiles({
                                  id: user.mainCharacter.id,
                                  files: user.mainCharacter.files,
                                  stage,
                                  entityType: "character",
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Nickname",
            width: 160,
            render: (_, user) => <div>{user.nickName ?? "Unknown"}</div>
        },
        {
            title: "GroupID",
            width: 90,
            render: (_, user) => user.mainGroupId ?? "Unknown"
        },
        {
            title: "Likes",
            width: 105,

            render: (_, user) => <div>{user.kpi.videoLikesCount ?? "Unknown"}</div>
        },
        {
            title: "Followers",
            width: 105,
            render: (_, user) => <div>{user.kpi.followersCount ?? "Unknown"}</div>
        },
        {
            title: "Levels",
            width: 105,
            render: (_, user) => <div>{user.kpi.totalLevelsCount ?? "Unknown"}</div>
        },
        {
            title: "Videos",
            width: 105,
            render: (_, user) => <div>{user.kpi.totalVideoCount ?? "Unknown"}</div>
        }
    ];

    return (
        <Table
            rowKey={(user: UserSocialProfile) => user.mainGroupId}
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            scroll={{ x: 700 }}
            onRow={onRow}
        />
    );
}

import React from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { USER_DETAILS_INFO_URL, USER_LEADERBOARD_LIST_URL } from "urls";
import { UserSocialProfile } from "features/user-leaderboard/services";
import { LeaderboardGrid } from "../components/LeaderboardGrid";
import { leaderboardListPageSelector } from "../store/leaderboardList.reducer";

export interface LeaderboardGridContainerProps {}

export function LeaderboardGridContainer({}: LeaderboardGridContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = USER_LEADERBOARD_LIST_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const stage = urlMatch.params.stage;
    const params = urlMatch.query || {};

    const info = useSelector(leaderboardListPageSelector(stage, params));

    if (!info.data && !info.loading) {
        return <Empty />;
    }

    const onRow = (user: UserSocialProfile) => ({
        onClick: () =>
            history.push(
                USER_DETAILS_INFO_URL.format({
                    stage,
                    selector: "mainGroupId",
                    id: user.mainGroupId
                })
            )
    });

    return (
        <LeaderboardGrid
            currentPage={info.currentPage}
            loading={info.loading}
            data={info.data ?? []}
            stage={stage}
            onRow={onRow}
        />
    );
}

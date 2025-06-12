import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { UserPerformance } from "../../../components/UserDetails/UserMainTab/UserPerformance";
import { USER_DETAILS_INFO_URL } from "urls";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export interface UserPerformanceContainerProps {}

export function UserPerformanceContainer({}: UserPerformanceContainerProps) {
    const location = useLocation();
    const urlMatch = USER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    return (
        <UserPerformance
            loading={info.loading && !info.data}
            kpi={info.data?.userProfileKPI}
            creatorScore={info.data?.mainGroup?.creatorScore}
            mainGroupId={info.data?.mainGroupId}
            stage={urlMatch.params.stage}
        />
    );
}

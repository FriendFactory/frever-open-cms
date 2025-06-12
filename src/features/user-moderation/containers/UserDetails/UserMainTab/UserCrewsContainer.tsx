import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { UserCrews } from "../../../components/UserDetails/UserMainTab/UserCrews";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { crewListPageSelector } from "features/crews-moderation";
import { USER_DETAILS_INFO_URL } from "urls";

export interface UserCrewsContainerProps {}

export function UserCrewsContainer({}: UserCrewsContainerProps) {
    const location = useLocation();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const info = useSelector(userDetailsPageSelector(urlMatch.params));
    const crewsInfo = useSelector(crewListPageSelector(urlMatch.params.stage, { member: info.data?.mainGroupId }));

    return (
        <UserCrews
            stage={urlMatch.params.stage}
            data={crewsInfo.data || []}
            loading={crewsInfo.loading || info.loading}
        />
    );
}

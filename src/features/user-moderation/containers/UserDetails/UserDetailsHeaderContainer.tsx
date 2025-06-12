import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import { USER_DETAILS_BASE_URL } from "urls";
import { UserDetailsHeader } from "../../components/UserDetails/UserDetailsHeader";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export interface UserDetailsHeaderContainerProps {}

export function UserDetailsHeaderContainer({}: UserDetailsHeaderContainerProps) {
    const location = useLocation();

    const urlMatch = USER_DETAILS_BASE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(userDetailsPageSelector(urlMatch.params));
    return <UserDetailsHeader data={info.data} />;
}

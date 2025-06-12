import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { UserCharacters } from "features/user-moderation/components/UserDetails/UserMainTab/UserCharacters";
import { USER_DETAILS_INFO_URL } from "urls";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export interface UserCharactersContainerProps {}

export function UserCharactersContainer({}: UserCharactersContainerProps) {
    const location = useLocation();

    const urlMatch = USER_DETAILS_INFO_URL.match(location);
    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    if (!info.data && !info.loading) {
        return null;
    }

    return <UserCharacters stage={urlMatch.params.stage} loading={info.loading && !info.data} user={info.data} />;
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Result } from "antd";

import { updateUserDataAction, updateUserGroupDataAction } from "../../../store";
import { UserInfo } from "../../../components/UserDetails/UserMainTab/UserInfo";
import { USER_DETAILS_INFO_URL } from "urls";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { useExtraDataBundle } from "shared";

export type UserGroupFlagName = "isCommunityBuilder" | "isStarCreatorCandidate" | "isStarCreator" | "isOnWatchList";

export interface UserInfoContainerProps {}

export function UserInfoContainer({}: UserInfoContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = USER_DETAILS_INFO_URL.match(location);

    const extra = useExtraDataBundle(["UserLevel", "Language", "Country"]);
    if (!urlMatch.isMatched) return <></>;

    const { stage } = urlMatch.params;
    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    const changeFeaturedStatus = () =>
        info.data &&
        dispatch(
            updateUserDataAction({
                stage,
                id: info.data.id,
                data: { isFeatured: !info.data.isFeatured }
            })
        );

    const updateUserGroupFlag = (flagName: UserGroupFlagName) => () =>
        info.data?.mainGroup &&
        dispatch(
            updateUserGroupDataAction({
                stage,
                groupId: info.data.mainGroupId,
                data: { [flagName]: !info.data.mainGroup[flagName] }
            })
        );

    if (!info.data && !info.loading)
        return <Result status="404" title={info.error ?? "User is not found or not accessible"} />;

    return (
        <UserInfo
            user={info.data}
            loading={!info.data && info.loading && extra.loading}
            stage={stage}
            changeFeaturedStatus={changeFeaturedStatus}
            updateUserGroupFlag={updateUserGroupFlag}
            bundleData={extra.bundle}
        />
    );
}

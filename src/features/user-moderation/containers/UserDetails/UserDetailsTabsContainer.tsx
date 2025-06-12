import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { UserDetailsTabs } from "../../components/UserDetails/UserDetailsTabs";
import {
    USER_COMMENTS_TAB_URL,
    USER_DETAILS_BASE_URL,
    USER_DETAILS_INFO_URL,
    USER_LEVEL_LIST_TAB_URL,
    USER_OUTFIT_LIST_TAB_URL,
    USER_PHOTO_LIST_TAB_URL,
    USER_ASSET_PURCHASES_TAB_URL,
    USER_SOUND_LIST_TAB_URL,
    USER_VIDEOCLIP_LIST_TAB_URL,
    USER_PURCHASE_HISTORY_TAB_URL,
    USER_ACTIVITY_TAB_URL
} from "urls";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";

export type UserPageTab =
    | "Info"
    | "Outfit"
    | "Level"
    | "Sound"
    | "Photo"
    | "VideoClip"
    | "Purchases"
    | "Comments"
    | "MoneyPurchases"
    | "UserActivity";

export interface UserDetailsTabsContainer {
    children: React.ReactChild | React.ReactChild[];
    currentTab: UserPageTab;
}

export function UserDetailsTabsContainer({ children, currentTab }: UserDetailsTabsContainer) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = USER_DETAILS_BASE_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(userDetailsPageSelector(urlMatch.params));

    const tabs: { id: UserPageTab; name: string; url: string | null }[] = useMemo(() => {
        const templateText = info.loading ? "..." : "??";
        const userProfileKPI = info.data?.userProfileKPI;
        return [
            {
                id: "Info",
                name: "User Info",
                url: USER_DETAILS_INFO_URL.format(urlMatch.params)
            },
            {
                id: "Outfit",
                name: `Outfits (${userProfileKPI?.outfitCount ?? templateText})`,
                url: info.data?.mainGroupId
                    ? USER_OUTFIT_LIST_TAB_URL.format(urlMatch.params, {
                          groupId: info.data?.mainGroupId
                      })
                    : null
            },
            {
                id: "Level",
                name: `Levels (${userProfileKPI?.totalLevelsCount ?? templateText})`,
                url: info.data?.mainGroupId
                    ? USER_LEVEL_LIST_TAB_URL.format(urlMatch.params, {
                          groupId: info.data?.mainGroupId
                      })
                    : null
            },
            {
                id: "Sound",
                name: `Sounds (${userProfileKPI?.userSoundsCount ?? templateText})`,
                url: info.data?.mainGroupId
                    ? USER_SOUND_LIST_TAB_URL.format(urlMatch.params, {
                          groupId: info.data?.mainGroupId
                      })
                    : null
            },
            {
                id: "Photo",
                name: `Photos (${userProfileKPI?.userPhotosCount ?? templateText})`,
                url: info.data?.id
                    ? USER_PHOTO_LIST_TAB_URL.format(urlMatch.params, { uploaderUserId: info.data?.id })
                    : null
            },
            {
                id: "VideoClip",
                name: `Video Clips (${userProfileKPI?.videoClipsCount ?? templateText})`,
                url: info.data?.id
                    ? USER_VIDEOCLIP_LIST_TAB_URL.format(urlMatch.params, {
                          uploaderUserId: info.data?.id
                      })
                    : null
            },
            {
                id: "Purchases",
                name: `Asset Purchases (${userProfileKPI?.totalPurchases ?? templateText})`,
                url: info.data?.mainGroupId
                    ? USER_ASSET_PURCHASES_TAB_URL.format(urlMatch.params, { groupId: info.data?.mainGroupId })
                    : null
            },
            {
                id: "MoneyPurchases",
                name: `Money Purchases`,
                url: info.data?.mainGroupId
                    ? USER_PURCHASE_HISTORY_TAB_URL.format(
                          { stage: urlMatch.params.stage, selector: "mainGroupId", id: info.data?.mainGroupId },
                          {}
                      )
                    : null
            },
            {
                id: "UserActivity",
                name: `User Activity`,
                url: info.data?.mainGroupId
                    ? USER_ACTIVITY_TAB_URL.format(
                          { stage: urlMatch.params.stage, selector: "mainGroupId", id: info.data?.mainGroupId },
                          {}
                      )
                    : null
            },
            {
                id: "Comments",
                name: `Comments`,
                url: info.data?.mainGroupId
                    ? USER_COMMENTS_TAB_URL.format(
                          { stage: urlMatch.params.stage, selector: "mainGroupId", id: info.data?.mainGroupId },
                          {}
                      )
                    : null
            }
        ];
    }, [info.data]);

    const handleChangePage = (pageId: UserPageTab) => {
        const tabUrl = tabs.find((el) => el.id === pageId)?.url;
        if (tabUrl) {
            history.replace(tabUrl);
        }
    };

    return (
        <UserDetailsTabs currentTab={currentTab} tabs={tabs} changePage={handleChangePage}>
            {children}
        </UserDetailsTabs>
    );
}

import React from "react";

import { ListPagerContainer } from "shared";
import { USER_OUTFIT_LIST_TAB_URL, DEFAULT_OUTFIT_LIST_PAGE_SIZE } from "urls";
import { ListLayoutFragment } from "layout";
import { UserPageLayout } from "features/user-moderation/containers/UserDetails/UserMainTab/UserPageLayout";
import { outfitListPageSelector } from "features/outfit-moderation/store/reducer/outfitList.reducer";
import { UserOutfitListContainer, UserOutfitListFilterContainer } from "features/outfit-moderation/containers";

export interface UserOutfitListPageProps {}

export function UserOutfitListPage({}: UserOutfitListPageProps) {
    return (
        <UserPageLayout tab="Outfit">
            <ListLayoutFragment padding="paddingLG">
                <UserOutfitListFilterContainer url={USER_OUTFIT_LIST_TAB_URL} />
                <UserOutfitListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_OUTFIT_LIST_PAGE_SIZE}
                    url={USER_OUTFIT_LIST_TAB_URL}
                    selectorFactory={outfitListPageSelector}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

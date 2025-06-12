import React from "react";

import { ListPagerContainer } from "shared";
import { SideMenuLayout, ContentWithHeaderFragment, ListLayoutFragment } from "layout";
import { DEFAULT_USER_LIST_PAGE_SIZE, USER_FOLLOWER_LIST_URL } from "urls";
import { UserFilterFormContainer } from "features/user-moderation/containers/UserFilterFormContaier";
import { UserFollowerTabsContainer } from "features/user-moderation/containers/UserFollowerTabsContainer";
import { UserDetailsHeaderContainer } from "features/user-moderation/containers/UserDetails/UserDetailsHeaderContainer";
import { userListPageSelector } from "features/user-moderation/store/reducer/user/userListReducer";
import { UserListContainer } from "features/user-moderation/containers/UserListContainer";

export interface UserFollowerListPageProps {}

export function UserFollowerListPage({}: UserFollowerListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <UserDetailsHeaderContainer />
                <UserFollowerTabsContainer url={USER_FOLLOWER_LIST_URL}>
                    <ListLayoutFragment padding="paddingLG">
                        <UserFilterFormContainer url={USER_FOLLOWER_LIST_URL} />
                        <UserListContainer url={USER_FOLLOWER_LIST_URL} selectorFactory={userListPageSelector} />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_USER_LIST_PAGE_SIZE}
                            url={USER_FOLLOWER_LIST_URL}
                            selectorFactory={userListPageSelector}
                        />
                    </ListLayoutFragment>
                </UserFollowerTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

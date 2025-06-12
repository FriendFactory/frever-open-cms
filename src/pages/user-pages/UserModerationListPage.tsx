import React from "react";

import { PageHeader } from "shared/components/PageHeader";
import { ContentWithHeaderFragment } from "layout/ContentWithHeaderFragment";
import { SideMenuLayout } from "layout/SideMenuLayout";
import { ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { USER_MODERATION_LIST_URL, DEFAULT_USER_LIST_PAGE_SIZE } from "urls";
import { UserFilterFormContainer } from "features/user-moderation/containers/UserFilterFormContaier";
import { UserListContainer } from "../../features/user-moderation/containers/UserListContainer";
import { userListPageSelector } from "../../features/user-moderation/store/reducer/user/userListReducer";
import { ListLayoutFragment } from "layout/ListLayoutFragment";

export interface UserModerationListPageProps {}

export function UserModerationListPage({}: UserModerationListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="All Users" />
                <StageSwitchTabsContainer url={USER_MODERATION_LIST_URL}>
                    <ListLayoutFragment>
                        <UserFilterFormContainer url={USER_MODERATION_LIST_URL} />
                        <UserListContainer url={USER_MODERATION_LIST_URL} selectorFactory={userListPageSelector} />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_USER_LIST_PAGE_SIZE}
                            url={USER_MODERATION_LIST_URL}
                            selectorFactory={userListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

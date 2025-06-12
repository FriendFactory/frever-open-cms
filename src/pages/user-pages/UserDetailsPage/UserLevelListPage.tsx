import React from "react";

import { DEFAULT_LEVEL_LIST_PAGE_SIZE, USER_LEVEL_LIST_TAB_URL } from "urls";
import { ListPagerContainer } from "shared";
import { ListLayoutFragment } from "layout";
import { UserPageLayout } from "features/user-moderation/containers/UserDetails/UserMainTab/UserPageLayout";
import { LevelListContainer, LevelListFilterContainer, levelListPageSelector } from "features/level-moderation";

export interface UserLevelListPageProps {}

export function UserLevelListPage({}: UserLevelListPageProps) {
    return (
        <UserPageLayout tab="Level">
            <ListLayoutFragment padding="paddingLG">
                <LevelListFilterContainer url={USER_LEVEL_LIST_TAB_URL} />
                <LevelListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_LEVEL_LIST_PAGE_SIZE}
                    url={USER_LEVEL_LIST_TAB_URL}
                    selectorFactory={levelListPageSelector}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

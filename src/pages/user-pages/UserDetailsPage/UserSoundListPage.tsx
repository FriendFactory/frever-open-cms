import React from "react";

import { ListPagerContainer } from "shared";
import { ListLayoutFragment } from "layout";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE, USER_SOUND_LIST_TAB_URL } from "urls";
import { UserPageLayout } from "features/user-moderation";
import {
    UserSoundListContainer,
    UserSoundListFilterContainer,
    userMediaFileListPageSelector
} from "features/user-media";

export interface UserSoundListPageProps {}

export function UserSoundListPage({}: UserSoundListPageProps) {
    return (
        <UserPageLayout tab="Sound">
            <ListLayoutFragment padding="paddingLG">
                <UserSoundListFilterContainer url={USER_SOUND_LIST_TAB_URL} />
                <UserSoundListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_LEVEL_LIST_PAGE_SIZE}
                    url={USER_SOUND_LIST_TAB_URL}
                    selectorFactory={(stage, params) => userMediaFileListPageSelector(stage, "UserSound", params)}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

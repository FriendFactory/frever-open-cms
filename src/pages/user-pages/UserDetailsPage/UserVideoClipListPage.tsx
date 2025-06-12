import React from "react";

import { ListPagerContainer } from "shared";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE, USER_VIDEOCLIP_LIST_TAB_URL } from "urls";
import { ListLayoutFragment } from "layout";
import { UserPageLayout } from "features/user-moderation";
import {
    UserVideoClipListFilterContainer,
    UserVideoClipListContainer,
    userMediaFileListPageSelector
} from "features/user-media";

export interface UserVideoClipListPageProps {}

export function UserVideoClipListPage({}: UserVideoClipListPageProps) {
    return (
        <UserPageLayout tab="VideoClip">
            <ListLayoutFragment padding="paddingLG">
                <UserVideoClipListFilterContainer url={USER_VIDEOCLIP_LIST_TAB_URL} />
                <UserVideoClipListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_LEVEL_LIST_PAGE_SIZE}
                    url={USER_VIDEOCLIP_LIST_TAB_URL}
                    selectorFactory={(stage, params) => userMediaFileListPageSelector(stage, "VideoClip", params)}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

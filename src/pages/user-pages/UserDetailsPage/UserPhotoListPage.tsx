import React from "react";

import { ListPagerContainer } from "shared";
import { ListLayoutFragment } from "layout";
import { DEFAULT_LEVEL_LIST_PAGE_SIZE, USER_PHOTO_LIST_TAB_URL } from "urls";
import { UserPageLayout } from "features/user-moderation";
import {
    UserPhotoListFilterContainer,
    UserPhotoListContainer,
    userMediaFileListPageSelector
} from "features/user-media";

export interface UserPhotoListPageProps {}

export function UserPhotoListPage({}: UserPhotoListPageProps) {
    return (
        <UserPageLayout tab="Photo">
            <ListLayoutFragment padding="paddingLG">
                <UserPhotoListFilterContainer url={USER_PHOTO_LIST_TAB_URL} />
                <UserPhotoListContainer />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_LEVEL_LIST_PAGE_SIZE}
                    url={USER_PHOTO_LIST_TAB_URL}
                    selectorFactory={(stage, params) => userMediaFileListPageSelector(stage, "Photo", params)}
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

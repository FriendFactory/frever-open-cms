import React from "react";

import { ListLayoutFragment } from "layout";
import { DEFAULT_USER_COMMENT_LIST_PAGE_SIZE, USER_COMMENTS_TAB_URL } from "urls";
import { ListPagerContainer } from "shared";
import { CommentListContainer, CommentsFilterFormContainer } from "features/video-comments";
import { UserPageLayout } from "features/user-moderation/containers/UserDetails/UserMainTab/UserPageLayout";
import { videoCommentsPagerSelector } from "features/video-comments/store/reducer/videoCommentListPageReducer";
import { VideoCommentsQueryParams } from "features/video-comments/services";

export interface UserCommentsPageProps {
    match: { params: { id: number } };
}

export function UserCommentsPage({ match: { params } }: UserCommentsPageProps) {
    return (
        <UserPageLayout tab="Comments">
            <ListLayoutFragment padding="paddingLG">
                <CommentsFilterFormContainer url={USER_COMMENTS_TAB_URL} withVideoFilter />
                <CommentListContainer url={USER_COMMENTS_TAB_URL} extraSelector={{ name: "group", value: params.id }} />
                <ListPagerContainer
                    defaultPageSize={DEFAULT_USER_COMMENT_LIST_PAGE_SIZE}
                    url={USER_COMMENTS_TAB_URL}
                    selectorFactory={(stage: string, query: VideoCommentsQueryParams) =>
                        videoCommentsPagerSelector(stage, {
                            group: params.id,
                            ...query
                        })
                    }
                />
            </ListLayoutFragment>
        </UserPageLayout>
    );
}

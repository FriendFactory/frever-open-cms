import React from "react";

import { VIDEO_MODERATION_COMMENTS_URL, DEFAULT_COMMENT_PAGE_SIZE } from "urls";
import { ListPagerContainer } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { VideoDetailsTabsContainer, VideoDetailsHeaderContainer } from "features/video-moderation";
import { CommentsFilterFormContainer, CommentListContainer } from "features/video-comments";
import { videoCommentsPagerSelector } from "features/video-comments/store/reducer/videoCommentListPageReducer";
import { VideoCommentsQueryParams } from "features/video-comments/services";

export interface VideoCommentsPageProps {
    match: { params: { id: number } };
}

export function VideoCommentsPage({ match: { params } }: VideoCommentsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <VideoDetailsHeaderContainer url={VIDEO_MODERATION_COMMENTS_URL} />
                <VideoDetailsTabsContainer url={VIDEO_MODERATION_COMMENTS_URL} activeTab="comments">
                    <ListLayoutFragment padding="paddingLG">
                        <CommentsFilterFormContainer url={VIDEO_MODERATION_COMMENTS_URL} withGroupFilter />
                        <CommentListContainer
                            url={VIDEO_MODERATION_COMMENTS_URL}
                            extraSelector={{ name: "videoId", value: params.id }}
                        />
                        <ListPagerContainer
                            defaultPageSize={DEFAULT_COMMENT_PAGE_SIZE}
                            url={VIDEO_MODERATION_COMMENTS_URL}
                            selectorFactory={(stage: string, query: VideoCommentsQueryParams) =>
                                videoCommentsPagerSelector(stage, {
                                    videoId: params.id,
                                    ...query
                                })
                            }
                        />
                    </ListLayoutFragment>
                </VideoDetailsTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

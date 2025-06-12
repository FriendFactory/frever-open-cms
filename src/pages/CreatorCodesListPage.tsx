import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { CREATOR_CODES_LIST_PAGE, USER_DETAILS_INFO_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { CreatorCodesListContainer } from "features/friend-codes";
import { UserThumbnailContainer } from "features/user-moderation/containers/UserThumbnailContainer";
import { CreateCreatorCodeContainer } from "features/friend-codes/containers/CreateCreatorCodeContainer";
import { UserCardContainer } from "features/user-moderation/containers/UserCardContainer";
import { UserSearchWindow } from "features/user-moderation/containers/UserSearchWindow";

export interface CreatorCodesListPageProps {}

export function CreatorCodesListPage({}: CreatorCodesListPageProps) {
    const location = useLocation();
    const urlMatch = CREATOR_CODES_LIST_PAGE.match(location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Star Creator Codes" />
                    <StageSwitchTabsContainer url={CREATOR_CODES_LIST_PAGE}>
                        <ListLayoutFragment>
                            <div></div>
                            <CreatorCodesListContainer
                                stage={urlMatch.params.stage}
                                params={urlMatch.query || {}}
                                extra={
                                    <CreateCreatorCodeContainer
                                        userCardComponent={UserCardContainer}
                                        userSearchWindowComponent={UserSearchWindow}
                                    />
                                }
                                renderUserThumbnail={(user) => (
                                    <Link
                                        to={USER_DETAILS_INFO_URL.format({
                                            stage: urlMatch.params.stage,
                                            selector: "mainGroupId",
                                            id: user.groupId
                                        })}>
                                        <UserThumbnailContainer width={160} height={200} groupId={user.groupId} />
                                    </Link>
                                )}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

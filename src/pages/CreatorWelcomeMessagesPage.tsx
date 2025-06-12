import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { CREATOR_WELCOME_MESSAGES_PAGE, USER_DETAILS_INFO_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { CreatorMessagesContainer } from "features/friend-codes";
import { UserThumbnailContainer } from "features/user-moderation/containers/UserThumbnailContainer";
import { UserCardContainer } from "features/user-moderation/containers/UserCardContainer";
import { UserSearchWindow } from "features/user-moderation/containers/UserSearchWindow";
import { CreateCreatorMessageContainer } from "features/friend-codes/containers/CreateCreatorMessageContainer";

export interface CreatorWelcomeMessagesPageProps {}

export function CreatorWelcomeMessagesPage({}: CreatorWelcomeMessagesPageProps) {
    const location = useLocation();
    const urlMatch = CREATOR_WELCOME_MESSAGES_PAGE.match(location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Star Creator Welcome Messages" />
                    <StageSwitchTabsContainer url={CREATOR_WELCOME_MESSAGES_PAGE}>
                        <ListLayoutFragment>
                            <div></div>
                            <CreatorMessagesContainer
                                stage={urlMatch.params.stage}
                                params={urlMatch.query || {}}
                                extra={
                                    <CreateCreatorMessageContainer
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

import React from "react";

import { DetailsPageLayout } from "layout/DetailsPageLayout";
import { ColumnsLayout } from "layout";
import {
    UserCharactersContainer,
    UserChatListContainer,
    UserCrewsContainer,
    UserInfoContainer,
    UserPageLayout,
    UserPerformanceContainer,
    UserReadinessContainer,
    UserThumbnailsContainer
} from "features/user-moderation";

export interface UserInfoPageProps {}

export function UserInfoPage({}: UserInfoPageProps) {
    return (
        <UserPageLayout tab="Info">
            <DetailsPageLayout>
                <ColumnsLayout>
                    <UserInfoContainer />
                    <UserCrewsContainer />
                    <UserPerformanceContainer />
                    <UserReadinessContainer />
                </ColumnsLayout>

                <UserThumbnailsContainer />
                <ColumnsLayout>
                    <UserChatListContainer />
                    <UserCharactersContainer />
                </ColumnsLayout>
            </DetailsPageLayout>
        </UserPageLayout>
    );
}

import React from "react";

import { USERSOUND_DETAILS_URL } from "urls";
import { SideMenuLayout, ColumnsLayout, ContentBlankLayout, ContentWithHeaderFragment } from "layout";
import { UserSoundMediaFileContainer, UserSoundFormContainer, UserSoundHeaderContainer } from "features/user-media";

export interface UserSoundDetailsPageProps {}

export function UserSoundDetailsPage({}: UserSoundDetailsPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <UserSoundHeaderContainer url={USERSOUND_DETAILS_URL} />
                <ContentBlankLayout>
                    <ColumnsLayout>
                        <UserSoundFormContainer />
                        <UserSoundMediaFileContainer />
                    </ColumnsLayout>
                </ContentBlankLayout>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

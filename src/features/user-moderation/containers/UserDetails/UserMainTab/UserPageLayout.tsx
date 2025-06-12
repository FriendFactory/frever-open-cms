import React from "react";

import { ContentWithHeaderFragment } from "layout/ContentWithHeaderFragment";
import { SideMenuLayout } from "layout/SideMenuLayout";
import { UserDetailsHeaderContainer } from "../UserDetailsHeaderContainer";
import { UserPageTab, UserDetailsTabsContainer } from "../UserDetailsTabsContainer";

export interface UserBasePageProps {
    tab: UserPageTab;
    children: JSX.Element | JSX.Element[];
}

export function UserPageLayout({ tab, children }: UserBasePageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <UserDetailsHeaderContainer />
                <UserDetailsTabsContainer currentTab={tab}>{children}</UserDetailsTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { SideMenuLayout, ContentWithHeaderFragment, ListLayoutFragment } from "layout";
import {
    CMSAdminUserListContainer,
    CMSAdminUserListFilterContainer,
    permissionUserPageSelector
} from "features/permission-moderation";
import { CMS_ADMIN_USERS_PAGE_SIZE, CMS_ADMIN_USERS_PAGE_URL } from "urls";

export function CMSAdminUsersPage(props: RouteComponentProps) {
    const urlMatch = CMS_ADMIN_USERS_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="CMS Users" />
                    <StageSwitchTabsContainer url={CMS_ADMIN_USERS_PAGE_URL}>
                        <ListLayoutFragment>
                            <CMSAdminUserListFilterContainer />
                            <CMSAdminUserListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                        </ListLayoutFragment>
                        <ListPagerContainer
                            url={CMS_ADMIN_USERS_PAGE_URL}
                            defaultPageSize={CMS_ADMIN_USERS_PAGE_SIZE}
                            selectorFactory={permissionUserPageSelector}
                        />
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

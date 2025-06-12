import React from "react";

import { PageHeader, PageURLNotMatch, StageSwitchTabsContainer } from "shared";
import { SideMenuLayout, ContentWithHeaderFragment } from "layout";
import { CMS_ADMIN_ROLES_PAGE_URL } from "urls";
import { RouteComponentProps } from "react-router";
import { CMSAdminRoleListContainer } from "features/permission-moderation";

export function CMSAdminRolesPage(props: RouteComponentProps) {
    const urlMatch = CMS_ADMIN_ROLES_PAGE_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="CMS Roles" />
                    <StageSwitchTabsContainer url={CMS_ADMIN_ROLES_PAGE_URL}>
                        <CMSAdminRoleListContainer stage={urlMatch.params.stage} />
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

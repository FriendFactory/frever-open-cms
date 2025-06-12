import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE, USER_ACTIVITY_TAB_URL } from "urls";
import { ListPagerContainer, PageErrorContainer, PageURLNotMatch } from "shared";
import { ListLayoutFragment } from "layout";
import {
    UserActivityListContainer,
    UserActivitySearchFilterContainer,
    UserPageLayout,
    userActivityPageSelector
} from "features/user-moderation";

export function UserActivityPage(props: RouteComponentProps) {
    const urlMatch = USER_ACTIVITY_TAB_URL.match(props.location);
    return (
        <UserPageLayout tab="UserActivity">
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ListLayoutFragment padding="paddingLG">
                    <UserActivitySearchFilterContainer />

                    <PageErrorContainer
                        selector={userActivityPageSelector(
                            urlMatch.params.stage,
                            urlMatch.params.id,
                            urlMatch.query || {}
                        )}>
                        <UserActivityListContainer
                            stage={urlMatch.params.stage}
                            groupId={urlMatch.params.id}
                            params={urlMatch.query || {}}
                        />
                    </PageErrorContainer>

                    <ListPagerContainer
                        defaultPageSize={DEFAULT_USER_ACTIVITY_LIST_PAGE_SIZE}
                        url={USER_ACTIVITY_TAB_URL}
                        selectorFactory={(stage, params) => userActivityPageSelector(stage, urlMatch.params.id, params)}
                    />
                </ListLayoutFragment>
            )}
        </UserPageLayout>
    );
}

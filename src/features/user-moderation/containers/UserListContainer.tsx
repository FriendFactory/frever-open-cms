import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";

import { UserGrid } from "../components/UserModerationList/UserGrid";
import { UserFollowerPageType, USER_DETAILS_INFO_URL } from "urls";
import { GetUserListParams, User } from "features/user-moderation/services";
import { UserListPageResult } from "../store/reducer/user/userListReducer";
import { AppState } from "app-state";

export interface UserListContainerProps {
    url: UrlPath<{ stage: string; page?: UserFollowerPageType; id?: number }, GetUserListParams>;
    selectorFactory: (stage: string, query: GetUserListParams) => (appState: AppState) => UserListPageResult;
}

export function UserListContainer({ url, selectorFactory }: UserListContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage, page, id } = urlMatch.params;

    const queryParams = useMemo(
        () => (page && id ? { [page]: id, ...urlMatch.query } : urlMatch.query || {}),
        [urlMatch.params, urlMatch.query]
    );

    const info = useSelector(selectorFactory(stage, queryParams));

    const onRow = useCallback(
        (user: User) => ({
            onClick: () => history.push(USER_DETAILS_INFO_URL.format({ stage, id: user.id, selector: "id" }))
        }),
        [stage]
    );

    const onSort = useCallback(
        (orderBy: GetUserListParams["orderBy"], sortDirection: GetUserListParams["sortDirection"]) => {
            const newUrl = url.replace(
                location,
                {},
                {
                    orderBy,
                    sortDirection
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location, history]
    );

    return (
        <UserGrid
            loading={info.loading && !info.data}
            kpiLoading={info.kpiLoading}
            data={info.data}
            stage={stage}
            orderBy={urlMatch.query?.orderBy}
            sortDirection={urlMatch.query?.sortDirection}
            onRow={onRow}
            onSort={onSort}
        />
    );
}

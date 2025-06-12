import React from "react";
import { useLocation, useHistory } from "react-router";
import { UrlPath } from "rd-url-utils";
import { Alert, Tabs } from "antd";

import { UserFollowerPageType, UserPageSelector } from "urls";
import { GetUserListParams } from "../services";

const tabs: UserFollowerPageType[] = ["followers", "following"];

export interface UserFollowerTabsContainerProps {
    children: React.ReactChild | React.ReactChild[];
    url: UrlPath<
        { stage: string; selector: UserPageSelector; id: number; page: UserFollowerPageType },
        GetUserListParams
    >;
}

export function UserFollowerTabsContainer({ children, url }: UserFollowerTabsContainerProps) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnChange = (activeKey: string) =>
        history.replace(url.format({ ...urlMatch.params, page: activeKey as UserFollowerPageType }));

    return (
        <Tabs
            items={tabs.map((tab) => ({ label: tab, key: tab, children: urlMatch.params.page === tab && children }))}
            type="card"
            activeKey={urlMatch.params.page}
            onChange={handleOnChange}>
            {children}
        </Tabs>
    );
}

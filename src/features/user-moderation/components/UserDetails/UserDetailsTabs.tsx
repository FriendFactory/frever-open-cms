import React from "react";
import { Tabs } from "antd";

import { UserPageTab } from "features/user-moderation/containers/UserDetails/UserDetailsTabsContainer";

export interface UserDetailsTabsProps {
    children: React.ReactChild | React.ReactChild[];
    currentTab: UserPageTab;
    tabs: { id: UserPageTab; name: string; url: string | null }[];
    changePage: (pageName: UserPageTab) => void;
}

export function UserDetailsTabs({ children, tabs, currentTab, changePage }: UserDetailsTabsProps) {
    return (
        <Tabs
            animated={false}
            activeKey={currentTab}
            onChange={changePage as any}
            items={tabs.map((tab) => ({
                key: tab.id,
                label: tab.name,
                disabled: !tab.url,
                children
            }))}
        />
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";

import { DEFAULT_DEVICE_BLACKLIST_LIST_SIZE, DEVICE_BLACKLIST_LIST_URL } from "urls";
import { StageSwitchTabsContainer, PageHeader, PageURLNotMatch, ListPagerContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import {
    deviceBlacklistListSelector,
    DeviceBlacklistFilterContainer,
    DeviceBlacklistListContainer
} from "features/blacklist-moderation";

export function DeviceBlacklistPage(props: RouteComponentProps) {
    const urlMatch = DEVICE_BLACKLIST_LIST_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Device Blacklist" />
                    <StageSwitchTabsContainer url={DEVICE_BLACKLIST_LIST_URL}>
                        <ListLayoutFragment>
                            <DeviceBlacklistFilterContainer url={DEVICE_BLACKLIST_LIST_URL} />
                            <DeviceBlacklistListContainer stage={urlMatch.params.stage} params={urlMatch.query || {}} />
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_DEVICE_BLACKLIST_LIST_SIZE}
                                url={DEVICE_BLACKLIST_LIST_URL}
                                selectorFactory={deviceBlacklistListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

import React from "react";
import { RouteComponentProps } from "react-router";
import { Space } from "antd";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader, PageURLNotMatch } from "shared";
import { COLD_START_URL, DEFAULT_VIDEO_PAGE_SIZE } from "urls";
import { ContentWithHeaderFragment, SideMenuLayout } from "layout";
import { videoModerationListPageSelector } from "features/video-moderation";
import { ColdStartListContainer } from "features/video-moderation/containers/ColdStartListContainer";

export function ColdStartPage(props: RouteComponentProps) {
    const urlMatch = COLD_START_URL.match(props.location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Cold Start" />
                    <StageSwitchTabsContainer url={COLD_START_URL}>
                        <Space direction="vertical">
                            <div></div>
                            <ColdStartListContainer
                                stage={urlMatch.params.stage}
                                params={{ ...urlMatch.query, isStartListItem: "true" }}
                            />
                            <ListPagerContainer
                                url={COLD_START_URL}
                                defaultPageSize={DEFAULT_VIDEO_PAGE_SIZE}
                                selectorFactory={(stage, params) =>
                                    videoModerationListPageSelector(stage, {
                                        ...params,
                                        isStartListItem: "true"
                                    })
                                }
                            />
                        </Space>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

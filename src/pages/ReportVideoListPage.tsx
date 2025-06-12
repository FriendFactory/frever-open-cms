import React from "react";
import { RouteComponentProps } from "react-router";

import { ListPagerContainer, StageSwitchTabsContainer, PageHeader, PageURLNotMatch, PageErrorContainer } from "shared";
import { ContentWithHeaderFragment, ListLayoutFragment, SideMenuLayout } from "layout";
import { DEFAULT_REPORTED_VIDEO_PAGE_SIZE, REPORTED_VIDEO_LIST_URL } from "urls";
import { ReportedVideoListContainer, FilterFormContainer, reportedVideoListSelector } from "features/reported-videos";

export interface ReportVideoListPageProps {}

export function ReportVideoListPage(props: RouteComponentProps) {
    const urlMatch = REPORTED_VIDEO_LIST_URL.match(props.location);
    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <PageHeader title="Reported Videos" />
                    <StageSwitchTabsContainer url={REPORTED_VIDEO_LIST_URL}>
                        <ListLayoutFragment>
                            <FilterFormContainer />
                            <PageErrorContainer
                                selector={reportedVideoListSelector(urlMatch.params.stage, urlMatch.query || {})}>
                                <ReportedVideoListContainer stage={urlMatch.params.stage} params={urlMatch.query} />
                            </PageErrorContainer>
                            <ListPagerContainer
                                defaultPageSize={DEFAULT_REPORTED_VIDEO_PAGE_SIZE}
                                url={REPORTED_VIDEO_LIST_URL}
                                selectorFactory={reportedVideoListSelector}
                            />
                        </ListLayoutFragment>
                    </StageSwitchTabsContainer>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

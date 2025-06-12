import React from "react";
import { useLocation } from "react-router";

import { SideMenuLayout, ContentWithHeaderFragment, DetailsPageLayout, ColumnsLayout } from "layout";
import { PageURLNotMatch, renderProtectedComponent } from "shared";
import { TASK_DETAILS_URL } from "urls";
import {
    TaskFormContainer,
    TaskHeaderContainer,
    TaskVideoPlayerContainer,
    TaskAssetsContainer,
    TaskInfoContainer,
    TaskTagsContainer,
    DetailsCharaReplacementContainer
} from "features/video-tasks";
import { TaskRewardsContainer } from "features/video-tasks/containers/TaskRewardsContainer";

export interface TaskDetailsPageProps {}

export function TaskDetailsPage({}: TaskDetailsPageProps) {
    const location = useLocation();
    const urlMatch = TASK_DETAILS_URL.match(location);

    return (
        <SideMenuLayout>
            {!urlMatch.isMatched ? (
                <PageURLNotMatch />
            ) : (
                <ContentWithHeaderFragment>
                    <TaskHeaderContainer />
                    <DetailsPageLayout reversed sideBlockWidth={400}>
                        <ColumnsLayout>
                            <TaskInfoContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <TaskFormContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <TaskTagsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <DetailsCharaReplacementContainer />
                        </ColumnsLayout>
                        <ColumnsLayout>
                            <TaskVideoPlayerContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                            <TaskRewardsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        </ColumnsLayout>
                        {renderProtectedComponent(
                            "AssetRead",
                            <TaskAssetsContainer stage={urlMatch.params.stage} id={urlMatch.params.id} />
                        )}
                    </DetailsPageLayout>
                </ContentWithHeaderFragment>
            )}
        </SideMenuLayout>
    );
}

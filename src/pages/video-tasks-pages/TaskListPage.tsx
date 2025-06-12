import React from "react";

import { DEFAULT_TASK_LIST_SIZE, TASK_LIST_URL } from "urls";
import { PageHeader, ListPagerContainer, StageSwitchTabsContainer } from "shared";
import { ContentWithHeaderFragment, SideMenuLayout, ListLayoutFragment } from "layout";
import { TaskListFilterFormContainer, TaskListContainer, taskListPageSelector } from "features/video-tasks";

export interface TaskListPageProps {}

export function TaskListPage({}: TaskListPageProps) {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="All tasks" />
                <StageSwitchTabsContainer url={TASK_LIST_URL}>
                    <ListLayoutFragment>
                        <TaskListFilterFormContainer />

                        <TaskListContainer />
                        <ListPagerContainer
                            url={TASK_LIST_URL}
                            defaultPageSize={DEFAULT_TASK_LIST_SIZE}
                            selectorFactory={taskListPageSelector}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

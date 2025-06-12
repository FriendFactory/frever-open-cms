import React from "react";
import { Route } from "react-router";

import { TaskListPage, TaskDetailsPage } from "pages";
import { TASK_LIST_URL, TASK_DETAILS_URL } from "urls";
import { renderProtectedPageElement } from "shared";

export const VideoTaskRoutes = [
    <Route
        key="task-details-page"
        path={TASK_DETAILS_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", TaskDetailsPage)}
    />,
    <Route
        key="task-list-page"
        path={TASK_LIST_URL.urlTemplate}
        render={renderProtectedPageElement("VideoModeration", TaskListPage)}
    />
];

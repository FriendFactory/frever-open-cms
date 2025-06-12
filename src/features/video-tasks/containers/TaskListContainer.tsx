import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { TaskList } from "../components/TaskList";
import { Task, TaskListQueryParams } from "../services";
import { taskListPageSelector } from "../store/reducer/taskList.reducer";
import { TASK_DETAILS_URL, TASK_LIST_URL } from "urls";

export function TaskListContainer() {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = TASK_LIST_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useSelector(taskListPageSelector(urlMatch.params.stage, urlMatch.query || {}));

    const onRow = (record: Task) => ({
        onClick: () => history.push(TASK_DETAILS_URL.format({ stage: urlMatch.params.stage, id: record.id }))
    });

    const onSort = useCallback(
        (orderBy: TaskListQueryParams["orderBy"], sortDirection: TaskListQueryParams["sortDirection"]) => {
            const newUrl = TASK_LIST_URL.replace(
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
        <TaskList
            loading={!info.data && info.loading}
            data={info.data}
            stage={urlMatch.params.stage}
            orderBy={urlMatch.query?.orderBy}
            sortDirection={urlMatch.query?.sortDirection}
            onRow={onRow}
            onSort={onSort}
        />
    );
}

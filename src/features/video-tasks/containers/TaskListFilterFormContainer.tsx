import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import { dateToForm, dateToUrl } from "utils";
import { TaskListFilterForm, TaskListFilterParams } from "../components/TaskListFilterForm";
import { TaskListQueryParams } from "../services";
import { TASK_LIST_URL } from "urls";

export function TaskListFilterFormContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = TASK_LIST_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const handleChange = useCallback(
        (form: TaskListFilterParams) => {
            const params = toTaskFormValues(form);
            const newUrl = TASK_LIST_URL.replace(
                location,
                {},
                {
                    ...params,
                    skip: undefined
                }
            );

            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    const values = toTaskUrlParams(urlMatch.query || {});

    return <TaskListFilterForm stage={urlMatch.params.stage} value={values} onChange={handleChange} />;
}

export const toTaskFormValues = (params: TaskListFilterParams): TaskListQueryParams => ({
    ...params,
    createdTime: params.createdTime ? dateToUrl(params.createdTime) : undefined,
    modifiedTime: params.modifiedTime ? dateToUrl(params.modifiedTime) : undefined
});

export const toTaskUrlParams = (form: TaskListQueryParams): TaskListFilterParams => ({
    ...form,
    createdTime: form.createdTime ? dateToForm(form.createdTime) : undefined,
    modifiedTime: form.modifiedTime ? dateToForm(form.modifiedTime) : undefined
});

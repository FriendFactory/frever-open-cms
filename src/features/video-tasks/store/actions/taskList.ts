import { defineActionGroup } from "rd-redux-utils";

import { Task, TaskListQueryParams } from "features/video-tasks/services";
import { ResultWithCount } from "shared";

export const taskListActionGroup = defineActionGroup<{ stage: string; params: TaskListQueryParams }>("TASK LIST");

export const taskListLoadingAction = taskListActionGroup.defineAction("LOADING");

export const taskListLoadAction = taskListActionGroup.defineAction("LOAD");

export const taskListLoadedOkAction =
    taskListActionGroup.defineAction<{ result: ResultWithCount<Task> }>("RESPONSE OK");

export const taskListLoadedErrorAction = taskListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

import { BASE_PAGE_URL } from "urls";
import { TaskListQueryParams } from "features/video-tasks/services";

export const TASK_BASE_URL = BASE_PAGE_URL.createChildPath("task");

export const TASK_LIST_URL = TASK_BASE_URL.createChildPath<{}, TaskListQueryParams>("list");

export const TASK_DETAILS_URL = TASK_BASE_URL.createChildPath<{ id: number }, {}>("details/:id");

export const DEFAULT_TASK_LIST_SIZE = 100;

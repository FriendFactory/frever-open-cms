import { Action } from "redux";
import qs from "query-string";

import { AppState } from "app-state";
import { PagingInfoSelectResult } from "shared";

import {
    taskListActionGroup,
    taskListLoadingAction,
    taskListLoadedOkAction,
    taskListLoadedErrorAction
} from "../actions";
import { taskKeySelector } from "./task.reducer";
import { Task, TaskListQueryParams } from "features/video-tasks/services";
import { DEFAULT_TASK_LIST_SIZE } from "urls";

export interface TaskListPagesState {
    loading: boolean;
    error?: string;
    total?: number;
    pagesById?: { [pageKey: string]: string[] };
}

export const taskListPageReducer = taskListActionGroup.hashedReducer(
    ({ stage, params }) => taskListPageKeySelector(stage, params),
    (state: TaskListPagesState | undefined, action: Action): TaskListPagesState => {
        if (!state) {
            state = { loading: false };
        }

        if (taskListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (taskListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (taskListLoadedOkAction.is(action)) {
            const ids = action.result.data.map((task) => taskKeySelector(action.stage, task.id));

            return {
                ...state,
                loading: false,
                total: action.result.count,
                pagesById: {
                    ...state.pagesById,
                    [pageKeySelector(action.params.skip)]: ids
                }
            };
        }

        return state;
    }
);

export interface TaskListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    stage: string;
    params: TaskListQueryParams;
    total: number;
    pageSize: number;
    currentPage: number;
    error?: string;
    data?: Task[];
}

export function taskListPageSelector(
    stage: string,
    params: TaskListQueryParams
): (appState: AppState) => TaskListPageResult {
    return (appState) => {
        const listPages = appState.task.listPages[taskListPageKeySelector(stage, params)];
        const entities = appState.task.entities;

        const page = listPages?.pagesById?.[pageKeySelector(params.skip ?? 0)];

        const data = page?.map((el) => entities[el]!).filter(Boolean);

        const currentPage = Math.floor((params.skip ?? 0) / (params.take ?? DEFAULT_TASK_LIST_SIZE)) + 1;

        return {
            loading: listPages?.loading ?? false,
            data,
            params,
            total: listPages?.total ?? 0,
            stage,
            error: listPages?.error,
            pageSize: DEFAULT_TASK_LIST_SIZE,
            currentPage
        };
    };
}

export function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}

export const taskListPageKeySelector = (stage: string, params: TaskListQueryParams): string => {
    const { skip, ...rest } = params;
    return `${stage}/params:${qs.stringify((rest as any) ?? {})}`;
};

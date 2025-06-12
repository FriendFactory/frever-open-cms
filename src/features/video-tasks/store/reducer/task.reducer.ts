import { Action } from "redux";

import { Task } from "features/video-tasks/services";
import { taskDetailsLoadedOkAction, taskListLoadedOkAction } from "../actions";

export interface TaskEntitiesState {
    [key: string]: Task | undefined;
}

export const taskEntitiesReducer = (state: TaskEntitiesState | undefined, action: Action): TaskEntitiesState => {
    if (!state) {
        state = {};
    }

    if (taskListLoadedOkAction.is(action)) {
        return { ...state, ...createTasksWithKey(action.result.data, action.stage, state) };
    }

    if (taskDetailsLoadedOkAction.is(action)) {
        return {
            ...state,
            [taskKeySelector(action.stage, action.id)]: {
                ...state[taskKeySelector(action.stage, action.id)],
                ...action.result
            }
        };
    }

    return state;
};

function createTasksWithKey(data: Task[], stage: string, currentState: TaskEntitiesState): TaskEntitiesState {
    return data.reduce((accumulator: { [key: string]: Task }, task) => {
        accumulator[taskKeySelector(stage, task.id)] = { ...currentState[taskKeySelector(stage, task.id)], ...task };
        return accumulator;
    }, {});
}

export const taskKeySelector = (stage: string, id: number): string => `${stage}/${id}`;

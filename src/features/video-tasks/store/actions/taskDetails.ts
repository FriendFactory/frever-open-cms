import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Task, TaskAssetsInfoToUpdate } from "features/video-tasks/services";
import { AssetData, AssetDataNames } from "features/search-assets/services";

export type UpdateTaskData = Omit<Partial<Task>, "tags"> & { tags?: Array<number | string> };

export const taskDetailsActionGroup = defineActionGroup<{ stage: string; id: number }>("TASK DETAILS");

export const taskDetailsLoadingAction = taskDetailsActionGroup.defineAction("LOADING");

export const taskDetailsLoadedOkAction = taskDetailsActionGroup.defineAction<{ result: Task }>("RESPONSE OK");

export const taskDetailsLoadedErrorAction = taskDetailsActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const loadTaskAssetsAction = defineAction<{ stage: string; task: Task }>("LOAD TASK ASSETS");

export const taskAssetsLoadedOkAction =
    defineAction<{ stage: string; assets: { [key: string]: AssetData[AssetDataNames][] } }>("TASK ASSETS LOADED OK");

export const updateTaskAction = defineAction<{
    stage: string;
    id: number;
    data: UpdateTaskData;
}>("UPDATE TASK DETAILS");

export const uploadCustomTaskThumbAction = defineAction<{
    stage: string;
    id: number;
    data: File;
}>("UPLOAD CUSTOM TASK THUMBNAIL");

export const updateTaskAssetsAction = defineAction<{
    stage: string;
    data: TaskAssetsInfoToUpdate;
}>("UPDATE TASK ASSETS");

export const copyTaskAction = defineAction<{ stage: string; id: number }>("COPY TASK");

export const copyTaskAssetsAction =
    defineAction<{ stage: string; targerTaskId: number; copyFromTaskId: number }>("COPY TASK ASSETS");

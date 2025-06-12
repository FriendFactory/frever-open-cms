import { Action } from "redux";

import { AppState } from "app-state";
import { Task, TaskAssetTypeName } from "features/video-tasks/services";
import { taskKeySelector } from "./task.reducer";
import {
    taskDetailsActionGroup,
    taskDetailsLoadingAction,
    taskDetailsLoadedOkAction,
    taskDetailsLoadedErrorAction
} from "../actions";
import { assetKeySelector } from "features/search-assets/store";
import { AssetData } from "features/search-assets/services";

export interface TaskDetailsPagesState {
    loading: boolean;
    error?: string;
}

export const taskDetailsPageReducer = taskDetailsActionGroup.hashedReducer(
    ({ stage, id }) => taskDetailsPageKeySelector(stage, id),
    (state: TaskDetailsPagesState | undefined, action: Action): TaskDetailsPagesState => {
        if (!state) {
            state = { loading: false };
        }

        if (taskDetailsLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (taskDetailsLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (taskDetailsLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false
            };
        }

        return state;
    }
);

export interface TaskDetailsPageResult {
    stage: string;
    loading: boolean;
    error?: string;
    data?: Task;
}

export function taskDetailsPageSelector(stage: string, id: number): (appState: AppState) => TaskDetailsPageResult {
    return (appState) => {
        const pageStatus = appState.task.detailsPages[taskDetailsPageKeySelector(stage, id)];

        const entity = appState.task.entities[taskKeySelector(stage, id)];

        return {
            stage,
            loading: pageStatus?.loading ?? false,
            data: entity,
            error: pageStatus?.error
        };
    };
}

export interface TaskAssetWithEntity<
    T extends TaskAssetTypeName | "CharacterSpawnPosition" = TaskAssetTypeName | "CharacterSpawnPosition"
> {
    info: {
        assetId: number;
        assetType: T;
    };
    entity?: AssetData[T];
}

export interface TaskAssetsResult {
    loading: boolean;
    task?: Task;
    assetList?: TaskAssetWithEntity[];
}

export function taskAssetsSelector(stage: string, id: number): (appState: AppState) => TaskAssetsResult {
    return (appState) => {
        const pageStatus = appState.task.detailsPages[taskDetailsPageKeySelector(stage, id)];
        const task = appState.task.entities[taskKeySelector(stage, id)];
        const assets = appState.asset.entities;

        const characterSpawnPositionAssets =
            task?.spawnPositions?.map((el) => ({
                assetId: el.characterSpawnPositionId,
                assetType: "CharacterSpawnPosition" as const
            })) ?? [];

        const assetList = [
            ...(task?.assets?.filter((el) => el.assetType !== "SetLocation") ?? []),
            ...characterSpawnPositionAssets
        ]?.map((el) => ({
            info: el,
            entity: assets[assetKeySelector(stage, el.assetType, el.assetId)] as AssetData[TaskAssetTypeName]
        }));

        return {
            loading: pageStatus?.loading ?? false,
            task,
            assetList
        };
    };
}

export const taskDetailsPageKeySelector = (stage: string, id: number): string => {
    return `${stage}/id:${id}`;
};

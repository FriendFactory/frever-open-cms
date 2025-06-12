import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { TASK_DETAILS_URL } from "urls";
import { updateTaskAssetsAction } from "../store/actions";
import { AssetData, CharacterSpawnPosition } from "features/search-assets/services";
import { Task, TaskAsset, TaskAssetsInfoToUpdate } from "../services";
import { TaskAssetWithEntity, taskDetailsPageSelector } from "../store/reducer/taskDetails.reducer";

export interface TaskAssetActionProps {
    value: TaskAssetWithEntity;
}

export function TaskAssetAction({ value }: TaskAssetActionProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = TASK_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { stage, id } = urlMatch.params;

    const { loading, data: task } = useSelector(taskDetailsPageSelector(stage, id));

    const isLinked = useMemo(() => (task ? checkIsTaskContainEntity(value.info, task) : false), [value, task]);

    const handleOnClick = () => {
        if (task) {
            const action = isLinked ? "remove" : "add";
            const { assets, spawnPositions } = task;

            if (assets && spawnPositions) {
                const data =
                    value.info.assetType === "CharacterSpawnPosition"
                        ? handleUpdateTaskSpawnPositions(action, value.entity as CharacterSpawnPosition, {
                              assets,
                              spawnPositions,
                              id
                          })
                        : handleUpdateTaskAssets(action, value.info as TaskAsset, { assets, spawnPositions, id });

                dispatch(
                    updateTaskAssetsAction({
                        stage,
                        data
                    })
                );
            }
        }
    };

    return (
        <Button
            disabled={loading || !task}
            type={!isLinked ? "primary" : "default"}
            ghost
            danger={isLinked}
            onClick={handleOnClick}
            icon={isLinked ? <MinusOutlined /> : <PlusOutlined />}
        />
    );
}

export const checkIsTaskContainEntity = (assetInfo: TaskAssetWithEntity["info"], task: Task | TaskAssetsInfoToUpdate) =>
    assetInfo.assetType === "CharacterSpawnPosition"
        ? task.spawnPositions?.some((el) => el.characterSpawnPositionId === assetInfo.assetId)
        : task.assets?.some((el) => el.assetId === assetInfo.assetId) ?? false;

export const handleUpdateTaskAssets = (
    action: "add" | "remove",
    taskAsset: TaskAsset,
    task: TaskAssetsInfoToUpdate
): TaskAssetsInfoToUpdate => {
    const isContains = checkIsTaskContainEntity(taskAsset, task);
    const createAssetKey = (value: TaskAsset) => `${value.assetType.toLocaleLowerCase()}/${value.assetId}`;
    let newAssets: TaskAsset[] | undefined;
    if (action === "add" && !isContains) {
        newAssets = [...task.assets, taskAsset];
    }
    if (action === "remove") {
        newAssets = task.assets.filter((asset) => createAssetKey(asset) !== createAssetKey(taskAsset));
    }
    return { ...task, assets: newAssets ?? task.assets };
};

export const handleUpdateTaskSpawnPositions = (
    action: "add" | "remove",
    spawnPosition: AssetData["CharacterSpawnPosition"],
    task: TaskAssetsInfoToUpdate
): TaskAssetsInfoToUpdate => {
    const setLocationId = spawnPosition.setLocation?.id;
    if (!setLocationId) {
        return task;
    }

    const isContains = checkIsTaskContainEntity(
        { assetId: spawnPosition.id, assetType: "CharacterSpawnPosition" },
        task
    );

    if (action === "add" && !isContains && setLocationId) {
        const spawnPositions = [...task.spawnPositions, { setLocationId, characterSpawnPositionId: spawnPosition.id }];
        return handleUpdateTaskAssets(
            "add",
            { assetId: setLocationId, assetType: "SetLocation" },
            { ...task, spawnPositions }
        );
    }

    if (action === "remove" && setLocationId) {
        const spawnPositions = task.spawnPositions.filter((el) => el.characterSpawnPositionId !== spawnPosition.id);
        return spawnPositions.find((el) => el.setLocationId === setLocationId)
            ? { ...task, spawnPositions }
            : handleUpdateTaskAssets("remove", { assetId: setLocationId, assetType: "SetLocation" }, task);
    }
    return task;
};
